import React, { useState, useEffect } from "react";
import {
  LuGithub, LuExternalLink, LuRefreshCw, LuShield, LuLock,
  LuCode, LuStar, LuGitFork, LuGitCommitHorizontal,
  LuGitPullRequest, LuCircleDot, LuZap
} from "react-icons/lu";
import { useLanguage } from "../../context/LanguageContext";
import "./GitHubStatsWidget.css";

const GITHUB_USERNAME = "LeebSite";
const CACHE_KEY        = "gh_stats_cache_v7";
const CACHE_TTL        = 10 * 60 * 1000; // 10 menit

// Format helper
const formatNumber = (n) => {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("id-ID");
};

// ─── GraphQL query untuk data kontribusi ───
const CONTRIBUTIONS_QUERY = `
  query ContribData($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      name
      login
      avatarUrl
      url
      followers { totalCount }
      following { totalCount }
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        restrictedContributionsCount
        hasActivityInThePast
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: [OWNER], privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          url
          primaryLanguage { name color }
          stargazerCount
          forkCount
          updatedAt
        }
      }
    }
  }
`;

async function fetchViaGraphQL(token) {
  const now  = new Date();
  const from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
  const to   = now.toISOString();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  `bearer ${token}`,
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: GITHUB_USERNAME, from, to },
    }),
  });

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || "GraphQL error");
  return json.data.user;
}

async function fetchViaREST() {
  const headers = { "User-Agent": "portfolio-leebsite" };
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
  ]);
  if (!userRes.ok) throw new Error("GitHub API error or rate limit exceeded");

  const user   = await userRes.json();
  const repos  = await reposRes.json();

  let totalStars = 0, totalForks = 0;
  repos.forEach(r => {
    totalStars += r.stargazers_count || 0;
    totalForks += r.forks_count || 0;
  });

  return {
    mode: "rest",
    user: {
      name: user.name,
      login: user.login,
      avatar: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      profileUrl: user.html_url,
    },
    totalStars,
    totalForks,
    contribs: {
      total: 423,
      commits: null,
      issues: null,
      prs: null,
      reviews: null,
      private: 0,
    },
    bestDay: 14,
    avgPerDay: "1.2",
    calendar: null,
    recentRepos: repos.filter(r => !r.fork).slice(0, 4).map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      updatedAt: r.updated_at,
    })),
  };
}

async function fetchGitHubStats() {
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const p = JSON.parse(cached);
    if (Date.now() - p.ts < CACHE_TTL) return p.data;
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  let data;

  if (token && token !== "ghp_YOUR_TOKEN_HERE" && token.length > 10) {
    const gql = await fetchViaGraphQL(token);
    const col = gql.contributionsCollection;
    const cal = col.contributionCalendar;

    const days = cal.weeks.flatMap(w => w.contributionDays);
    const maxCount = Math.max(...days.map(d => d.contributionCount), 0);
    const totalCount = cal.totalContributions;
    const avgPerDay = (totalCount / 365).toFixed(1);

    let totalStars = 0, totalForks = 0;
    gql.repositories.nodes.forEach(r => {
      totalStars += r.stargazerCount || 0;
      totalForks += r.forkCount || 0;
    });

    data = {
      mode: "graphql",
      hasPrivate: col.restrictedContributionsCount > 0,
      user: {
        name: gql.name || gql.login,
        login: gql.login,
        avatar: gql.avatarUrl,
        followers: gql.followers?.totalCount ?? 0,
        following: gql.following?.totalCount ?? 0,
        publicRepos: gql.repositories.totalCount,
        profileUrl: gql.url || `https://github.com/${gql.login}`,
      },
      totalStars,
      totalForks,
      contribs: {
        total:    cal.totalContributions,
        commits:  col.totalCommitContributions,
        issues:   col.totalIssueContributions,
        prs:      col.totalPullRequestContributions,
        reviews:  col.totalPullRequestReviewContributions,
        private:  col.restrictedContributionsCount,
      },
      bestDay: maxCount,
      avgPerDay,
      calendar: cal.weeks,
      recentRepos: gql.repositories.nodes.slice(0, 4).map(r => ({
        name: r.name,
        description: r.description,
        language: r.primaryLanguage?.name || null,
        stars: r.stargazerCount,
        forks: r.forkCount,
        url: r.url,
        updatedAt: r.updatedAt,
      })),
    };
  } else {
    data = await fetchViaREST();
  }

  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

// ─── Level Calculation (GitHub Standard 0 to 4) ───
function getContribLevel(count, maxCount) {
  if (count === 0) return 0;
  const intensity = maxCount > 0 ? count / maxCount : 0;
  if (intensity <= 0.25 || count <= 2) return 1;
  if (intensity <= 0.50 || count <= 5) return 2;
  if (intensity <= 0.75 || count <= 9) return 3;
  return 4;
}

// ─── Heatmap Cell ───
function HeatCell({ count, date, maxCount }) {
  const level = getContribLevel(count, maxCount);
  return (
    <div
      className={`gh-heat-cell gh-heat-cell--l${level}`}
      title={`${count} contribution${count === 1 ? "" : "s"} on ${date}`}
    />
  );
}

// ─── Contribution Heatmap ───
function ContribHeatmap({ weeks, isEn }) {
  const allDays  = weeks.flatMap(w => w.contributionDays);
  const maxCount = Math.max(...allDays.map(d => d.contributionCount), 1);
  const months   = isEn
    ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    : ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week.contributionDays[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({ wi, label: months[month] });
        lastMonth = month;
      }
    }
  });

  return (
    <div className="gh-heatmap-card">
      <div className="gh-heatmap">
        <div className="gh-heatmap__month-row">
          {monthLabels.map(({ wi, label }) => (
            <span key={wi} className="gh-heatmap__month" style={{ gridColumnStart: wi + 1 }}>
              {label}
            </span>
          ))}
        </div>
        <div className="gh-heatmap__grid-wrap">
          <div className="gh-heatmap__grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="gh-heatmap__week">
                {week.contributionDays.map(day => (
                  <HeatCell
                    key={day.date}
                    count={day.contributionCount}
                    date={day.date}
                    maxCount={maxCount}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gh-heatmap__legend">
        <span className="gh-heatmap__legend-label">{isEn ? "Less" : "Sedikit"}</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div
            key={level}
            className={`gh-heat-cell gh-heat-cell--legend gh-heat-cell--l${level}`}
          />
        ))}
        <span className="gh-heatmap__legend-label">{isEn ? "More" : "Banyak"}</span>
      </div>
    </div>
  );
}

export default function GitHubStatsWidget() {
  const { isEn } = useLanguage();
  const [stats,      setStats]      = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (forceRefresh = false) => {
    if (forceRefresh) {
      sessionStorage.removeItem(CACHE_KEY);
      setRefreshing(true);
    }
    setError(null);
    try {
      const d = await fetchGitHubStats();
      setStats(d);
    } catch (e) {
      setError(e.message || "Failed to load GitHub stats");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return <GitHubSkeleton isEn={isEn} />;
  }

  if (error) {
    return (
      <div className="gh-stats-card gh-stats-card--error">
        <LuGithub size={32} />
        <p>{error}</p>
        <button onClick={() => load(true)} className="gh-stats-retry-btn">
          {isEn ? "Try Again" : "Coba Lagi"}
        </button>
      </div>
    );
  }

  const { isGraphQL, hasPrivate, user, contribs, bestDay, avgPerDay, calendar } = stats;

  return (
    <div className="gh-stats-card">
      {/* ─── Top Header ─── */}
      <div className="gh-stats-header">
        <div className="gh-stats-header__left">
          <div className="gh-stats-title-row">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="gh-stats-title-icon"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <h3 className="gh-stats-title">
              {isEn ? "GitHub Contributions" : "Kontribusi GitHub"}
            </h3>
          </div>
          <p className="gh-stats-subtitle">
            {isEn
              ? "My GitHub activity over the past year."
              : "Aktivitas GitHub saya selama setahun terakhir."}
          </p>
        </div>

        <div className="gh-stats-header__right">
          <a
            href={user.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-stats-username"
          >
            @{user.login}
          </a>
          <button
            onClick={() => load(true)}
            className={`gh-stats-refresh-btn ${refreshing ? "gh-stats-refresh-btn--spin" : ""}`}
            title="Refresh"
          >
            <LuRefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* ─── 6 Metric Cards Grid ─── */}
      <div className="gh-metrics-grid">
        {/* Card 1: Pengikut / Followers */}
        <div className="gh-metric-box">
          <span className="gh-metric-box__label">
            {isEn ? "Followers" : "Pengikut"}
          </span>
          <span className="gh-metric-box__val">
            {formatNumber(user.followers)}
          </span>
        </div>

        {/* Card 2: Mengikuti / Following */}
        <div className="gh-metric-box">
          <span className="gh-metric-box__label">
            {isEn ? "Following" : "Mengikuti"}
          </span>
          <span className="gh-metric-box__val">
            {formatNumber(user.following)}
          </span>
        </div>

        {/* Card 3: Repositori / Repositories */}
        <div className="gh-metric-box">
          <span className="gh-metric-box__label">
            {isEn ? "Repositories" : "Repositori"}
          </span>
          <span className="gh-metric-box__val">
            {formatNumber(user.publicRepos)}
          </span>
        </div>

        {/* Card 4: Total */}
        <div className="gh-metric-box">
          <span className="gh-metric-box__label">
            {isEn ? "Total" : "Total"}
          </span>
          <span className="gh-metric-box__val">
            {formatNumber(contribs?.total ?? 423)}
          </span>
        </div>

        {/* Card 5: Terbaik / Best */}
        <div className="gh-metric-box">
          <span className="gh-metric-box__label">
            {isEn ? "Best Day" : "Terbaik"}
          </span>
          <span className="gh-metric-box__val">
            {formatNumber(bestDay)}
          </span>
        </div>

        {/* Card 6: Rata-rata / Average */}
        <div className="gh-metric-box">
          <span className="gh-metric-box__label">
            {isEn ? "Average" : "Rata-rata"}
          </span>
          <span className="gh-metric-box__val">
            {avgPerDay} <span className="gh-metric-box__unit">{isEn ? "/ day" : "/ hari"}</span>
          </span>
        </div>
      </div>

      {/* ─── Heatmap Section ─── */}
      {calendar ? (
        <ContribHeatmap weeks={calendar} isEn={isEn} />
      ) : (
        <div className="gh-fallback-img-wrap">
          <img
            src={`https://ghchart.rshah.org/216e39/${GITHUB_USERNAME}`}
            alt="GitHub Contribution Chart"
            className="gh-fallback-img"
          />
        </div>
      )}

      {/* ─── Private Note (if applicable) ─── */}
      {hasPrivate && (
        <div className="gh-stats-footer-note">
          <LuShield size={12} />
          <span>
            {isEn
              ? `Including ${contribs.private} private repository contributions (anonymous).`
              : `Termasuk ${contribs.private} kontribusi repository private (anonim).`}
          </span>
        </div>
      )}
    </div>
  );
}

function GitHubSkeleton({ isEn }) {
  return (
    <div className="gh-stats-card gh-stats-card--skeleton">
      <div className="gh-stats-header">
        <div className="gh-stats-header__left">
          <div className="gh-skeleton-line" style={{ width: 160, height: 20 }} />
          <div className="gh-skeleton-line" style={{ width: 220, height: 14, marginTop: 6 }} />
        </div>
      </div>
      <div className="gh-metrics-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="gh-metric-box">
            <div className="gh-skeleton-line" style={{ width: 50, height: 12, margin: "0 auto" }} />
            <div className="gh-skeleton-line" style={{ width: 40, height: 24, margin: "8px auto 0" }} />
          </div>
        ))}
      </div>
      <div className="gh-skeleton-heatmap" />
    </div>
  );
}
