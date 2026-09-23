import React, { useState, useEffect } from "react";
import {
  LuGithub, LuGitCommitHorizontal, LuStar, LuGitFork,
  LuCode, LuUsers, LuExternalLink, LuRefreshCw,
  LuGitPullRequest, LuCircleDot, LuShield, LuLock, LuZap
} from "react-icons/lu";
import "./GitHubStatsWidget.css";

const GITHUB_USERNAME = "LeebSite";
const CACHE_KEY        = "gh_stats_cache_v6";
const CACHE_TTL        = 10 * 60 * 1000; // 10 menit

// Warna bahasa pemrograman
const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  PHP: "#4F5D95", Java: "#b07219", Blade: "#f7523f", "C#": "#178600",
  HTML: "#e34c26", CSS: "#563d7c", Dart: "#00B4AB", Go: "#00ADD8",
  Rust: "#dea584", Vue: "#41b883", Swift: "#ffac45",
};
const getLangColor = (lang) => LANG_COLORS[lang] || "#8b949e";

const formatNumber = (n) => {
  if (!n && n !== 0) return "—";
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
};

const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)           return diff + "s ago";
  if (diff < 3600)         return Math.floor(diff / 60) + "m ago";
  if (diff < 86400)        return Math.floor(diff / 86400) + "d ago";
  if (diff < 86400 * 30)  return Math.floor(diff / 86400) + "d ago";
  if (diff < 86400 * 365) return Math.floor(diff / (86400 * 30)) + "mo ago";
  return Math.floor(diff / (86400 * 365)) + "y ago";
};

// ─── GraphQL query untuk data kontribusi (termasuk private jika diizinkan) ───
const CONTRIBUTIONS_QUERY = `
  query ContribData($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
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
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`, { headers }),
  ]);
  if (!userRes.ok) throw new Error("GitHub API error or rate limit exceeded");

  const user   = await userRes.json();
  const repos  = await reposRes.json();
  const events = await eventsRes.json();

  const langCount = {};
  let totalStars = 0, totalForks = 0;
  repos.forEach(r => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    totalStars += r.stargazers_count || 0;
    totalForks += r.forks_count || 0;
  });
  const totalLangRepos  = Object.values(langCount).reduce((a, b) => a + b, 0);
  const topLanguages    = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([lang, count]) => ({ lang, count, pct: Math.round((count / totalLangRepos) * 100) }));

  return {
    mode: "rest",
    user: {
      name: user.name, login: user.login, avatar: user.avatar_url,
      followers: user.followers, following: user.following,
      publicRepos: user.public_repos, profileUrl: user.html_url,
    },
    totalStars, totalForks,
    topLanguages,
    contribs: null,
    calendar: null,
    recentRepos: repos.filter(r => !r.fork).slice(0, 4).map(r => ({
      name: r.name, description: r.description, language: r.language,
      stars: r.stargazers_count, forks: r.forks_count,
      url: r.html_url, updatedAt: r.updated_at,
    })),
    recentActivity: events.slice(0, 6).map(e => ({
      type: e.type, repo: e.repo?.name?.split("/")[1] || e.repo?.name, createdAt: e.created_at,
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
    // ─── Mode GraphQL (token tersedia) — termasuk kontribusi private ───
    const gql = await fetchViaGraphQL(token);
    const col  = gql.contributionsCollection;
    const cal  = col.contributionCalendar;

    const langCount = {};
    let totalStars = 0, totalForks = 0;
    gql.repositories.nodes.forEach(r => {
      if (r.primaryLanguage?.name) langCount[r.primaryLanguage.name] = (langCount[r.primaryLanguage.name] || 0) + 1;
      totalStars += r.stargazerCount || 0;
      totalForks += r.forkCount || 0;
    });
    const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
    const topLanguages   = Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([lang, count]) => ({ lang, count, pct: Math.round((count / totalLangRepos) * 100) }));

    // Hitung streak dari calendar
    let currentStreak = 0, longestStreak = 0, streak = 0;
    const days = cal.weeks.flatMap(w => w.contributionDays).sort((a, b) => new Date(a.date) - new Date(b.date));
    let inStreak = false;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].contributionCount > 0) {
        if (!inStreak) inStreak = true;
        currentStreak++;
      } else if (inStreak) break;
    }
    days.forEach(d => {
      if (d.contributionCount > 0) { streak++; longestStreak = Math.max(longestStreak, streak); }
      else streak = 0;
    });

    // Ambil REST user info untuk avatar dll
    const userRes  = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: { "User-Agent": "portfolio-leebsite" } });
    const restUser = await userRes.json();

    data = {
      mode: "graphql",
      hasPrivate: col.restrictedContributionsCount > 0,
      user: {
        name: restUser.name, login: restUser.login, avatar: restUser.avatar_url,
        followers: restUser.followers, following: restUser.following,
        publicRepos: gql.repositories.totalCount, profileUrl: restUser.html_url,
      },
      totalStars, totalForks,
      topLanguages,
      contribs: {
        total:    cal.totalContributions,
        commits:  col.totalCommitContributions,
        issues:   col.totalIssueContributions,
        prs:      col.totalPullRequestContributions,
        reviews:  col.totalPullRequestReviewContributions,
        private:  col.restrictedContributionsCount,
      },
      calendar: cal.weeks,
      currentStreak,
      longestStreak,
      recentRepos: gql.repositories.nodes.slice(0, 4).map(r => ({
        name: r.name, description: r.description,
        language: r.primaryLanguage?.name || null,
        stars: r.stargazerCount, forks: r.forkCount,
        url: r.url, updatedAt: r.updatedAt,
      })),
      recentActivity: [],
    };
  } else {
    // ─── Mode REST (tanpa token) — hanya data publik ───
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

// ─── Heatmap Cell (Adapts to Light / Dark Mode via CSS variables) ───
function HeatCell({ count, date, maxCount }) {
  const level = getContribLevel(count, maxCount);

  return (
    <div
      className={`gh-heat-cell gh-heat-cell--l${level}`}
      title={`${count} contribution${count === 1 ? '' : 's'} on ${date}`}
    />
  );
}

// ─── Contribution Heatmap ───
function ContribHeatmap({ weeks }) {
  const allDays   = weeks.flatMap(w => w.contributionDays);
  const maxCount  = Math.max(...allDays.map(d => d.contributionCount), 1);
  const months    = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dayLabels = ["","Mon","","Wed","","Fri",""];

  // Get month labels from the week data
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
    <div className="gh-heatmap">
      <div className="gh-heatmap__month-row">
        {monthLabels.map(({ wi, label }) => (
          <span key={wi} className="gh-heatmap__month" style={{ gridColumnStart: wi + 1 }}>{label}</span>
        ))}
      </div>
      <div className="gh-heatmap__grid-wrap">
        <div className="gh-heatmap__day-labels">
          {dayLabels.map((l, i) => <span key={i} className="gh-heatmap__day-lbl">{l}</span>)}
        </div>
        <div className="gh-heatmap__grid">
          {weeks.map((week, wi) => (
            <div key={wi} className="gh-heatmap__week">
              {week.contributionDays.map(day => (
                <HeatCell key={day.date} count={day.contributionCount} date={day.date} maxCount={maxCount} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="gh-heatmap__legend">
        <span className="gh-heatmap__legend-label">Less</span>
        {[0, 1, 2, 3, 4].map(level => (
          <div
            key={level}
            className={`gh-heat-cell gh-heat-cell--legend gh-heat-cell--l${level}`}
          />
        ))}
        <span className="gh-heatmap__legend-label">More</span>
      </div>
    </div>
  );
}

// ─── Activity Icon ───
function ActivityIcon({ type }) {
  const icons = {
    PushEvent:          { emoji: "⚡", label: "Pushed" },
    CreateEvent:        { emoji: "✨", label: "Created" },
    PullRequestEvent:   { emoji: "🔀", label: "PR" },
    IssuesEvent:        { emoji: "🎯", label: "Issue" },
    WatchEvent:         { emoji: "⭐", label: "Starred" },
    ForkEvent:          { emoji: "🍴", label: "Forked" },
    DeleteEvent:        { emoji: "🗑️", label: "Deleted" },
    IssueCommentEvent:  { emoji: "💬", label: "Commented" },
  };
  const item = icons[type] || { emoji: "📦", label: "Activity" };
  return <span className="gh-activity__icon" title={item.label}>{item.emoji}</span>;
}

export default function GitHubStatsWidget() {
  const [stats,      setStats]      = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab,  setActiveTab]  = useState("overview");

  const load = async (forceRefresh = false) => {
    if (forceRefresh) { sessionStorage.removeItem(CACHE_KEY); setRefreshing(true); }
    setError(null);
    try   { const d = await fetchGitHubStats(); setStats(d); }
    catch (e) { setError(e.message || "Failed to load GitHub stats"); }
    finally   { setLoading(false); setRefreshing(false); }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <GitHubSkeleton />;
  if (error)   return (
    <div className="gh-widget gh-widget--error">
      <LuGithub className="gh-widget__error-icon" />
      <p className="gh-widget__error-text">{error}</p>
      <button className="gh-widget__retry-btn" onClick={() => load(true)}>Try Again</button>
    </div>
  );

  const { mode, hasPrivate, user, totalStars, totalForks, topLanguages,
          contribs, calendar, currentStreak, longestStreak, recentRepos, recentActivity } = stats;
  const isGraphQL = mode === "graphql";

  return (
    <div className="gh-widget">

      {/* ─── Header ─── */}
      <div className="gh-widget__header">
        <div className="gh-widget__profile">
          <div className="gh-widget__avatar-wrap">
            <img src={user.avatar} alt={user.login} className="gh-widget__avatar" />
            <span className="gh-widget__avatar-ring" />
          </div>
          <div className="gh-widget__profile-info">
            <div className="gh-widget__name-row">
              <span className="gh-widget__name">{user.name || user.login}</span>
              <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="gh-widget__profile-link">
                <LuExternalLink size={13} />
              </a>
            </div>
            <span className="gh-widget__login">@{user.login}</span>
          </div>
        </div>
        <div className="gh-widget__header-actions">
          {isGraphQL && hasPrivate && (
            <div className="gh-widget__private-badge" title="Menampilkan kontribusi termasuk repo private (anonim)">
              <LuShield size={11} /> Private incl.
            </div>
          )}
          <button
            className={"gh-widget__refresh" + (refreshing ? " gh-widget__refresh--spinning" : "")}
            onClick={() => load(true)} title="Refresh data"
          >
            <LuRefreshCw size={14} />
          </button>
          <div className="gh-widget__live-badge">
            <span className="gh-widget__live-dot" /> Live
          </div>
        </div>
      </div>

      {/* ─── Stats Bar ─── */}
      <div className={`gh-widget__stats-bar ${isGraphQL ? "gh-widget__stats-bar--6" : ""}`}>
        <div className="gh-widget__stat-item">
          <LuCode size={14} className="gh-widget__stat-icon" />
          <span className="gh-widget__stat-val">{formatNumber(user.publicRepos)}</span>
          <span className="gh-widget__stat-lbl">Repos</span>
        </div>
        <div className="gh-widget__stat-divider" />
        <div className="gh-widget__stat-item">
          <LuStar size={14} className="gh-widget__stat-icon gh-widget__stat-icon--yellow" />
          <span className="gh-widget__stat-val">{formatNumber(totalStars)}</span>
          <span className="gh-widget__stat-lbl">Stars</span>
        </div>
        <div className="gh-widget__stat-divider" />
        <div className="gh-widget__stat-item">
          <LuUsers size={14} className="gh-widget__stat-icon gh-widget__stat-icon--purple" />
          <span className="gh-widget__stat-val">{formatNumber(user.followers)}</span>
          <span className="gh-widget__stat-lbl">Followers</span>
        </div>
        {isGraphQL && contribs && (
          <>
            <div className="gh-widget__stat-divider" />
            <div className="gh-widget__stat-item">
              <LuGitCommitHorizontal size={14} className="gh-widget__stat-icon gh-widget__stat-icon--green" />
              <span className="gh-widget__stat-val">{formatNumber(contribs.total)}</span>
              <span className="gh-widget__stat-lbl">Contribs (1y)</span>
            </div>
            <div className="gh-widget__stat-divider" />
            <div className="gh-widget__stat-item">
              <LuZap size={14} className="gh-widget__stat-icon gh-widget__stat-icon--yellow" />
              <span className="gh-widget__stat-val">{longestStreak}d</span>
              <span className="gh-widget__stat-lbl">Streak</span>
            </div>
          </>
        )}
      </div>

      {/* ─── Navigation Tabs ─── */}
      <div className="gh-widget__tabs">
        <button
          className={`gh-widget__tab ${activeTab === "overview" ? "gh-widget__tab--active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`gh-widget__tab ${activeTab === "repos" ? "gh-widget__tab--active" : ""}`}
          onClick={() => setActiveTab("repos")}
        >
          Top Repos ({recentRepos.length})
        </button>
        {isGraphQL && (
          <button
            className={`gh-widget__tab ${activeTab === "contribs" ? "gh-widget__tab--active" : ""}`}
            onClick={() => setActiveTab("contribs")}
          >
            Kontribusi Detail
          </button>
        )}
        {!isGraphQL && (
          <button
            className={`gh-widget__tab ${activeTab === "activity" ? "gh-widget__tab--active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        )}
      </div>

      {/* ─── Tab Content ─── */}
      <div className="gh-widget__body">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="gh-widget__overview">
            {/* Top Languages */}
            <p className="gh-widget__section-label">Top Languages</p>
            <div className="gh-lang-bar">
              {topLanguages.map(({ lang, pct }) => (
                <div key={lang} className="gh-lang-bar__segment"
                  style={{ width: pct + "%", background: getLangColor(lang) }}
                  title={`${lang}: ${pct}%`} />
              ))}
            </div>
            <div className="gh-lang-list">
              {topLanguages.map(({ lang, pct }) => (
                <div key={lang} className="gh-lang-item">
                  <span className="gh-lang-dot" style={{ background: getLangColor(lang) }} />
                  <span className="gh-lang-name">{lang}</span>
                  <span className="gh-lang-pct">{pct}%</span>
                </div>
              ))}
            </div>

            {/* Contribution Heatmap (GraphQL) atau fallback image (REST) */}
            <div className="gh-widget__contrib-wrap">
              <div className="gh-widget__contrib-header">
                <p className="gh-widget__section-label" style={{margin:0}}>
                  {contribs?.total ? `${contribs.total} contributions in the last year` : "Contribution Graph"}
                </p>
                {isGraphQL && hasPrivate && (
                  <span className="gh-private-note">
                    <LuLock size={10}/> Private incl: <strong>{contribs?.private}</strong>
                  </span>
                )}
              </div>

              {isGraphQL && calendar ? (
                <ContribHeatmap weeks={calendar} />
              ) : (
                <div className="gh-widget__contrib-img-wrap">
                  <img
                    src={`https://ghchart.rshah.org/216e39/${GITHUB_USERNAME}`}
                    alt="GitHub Contribution Chart"
                    className="gh-widget__contrib-img"
                    loading="lazy"
                    onError={(e) => { e.target.closest('.gh-widget__contrib-img-wrap').style.display='none'; }}
                  />
                  <p className="gh-widget__contrib-note">
                    * Hanya kontribusi publik. Aktifkan token untuk melihat semua.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* REPOS */}
        {activeTab === "repos" && (
          <div className="gh-widget__repos">
            {recentRepos.map(repo => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="gh-repo-card">
                <div className="gh-repo-card__top">
                  <LuCode size={14} className="gh-repo-card__code-icon" />
                  <span className="gh-repo-card__name">{repo.name}</span>
                  <LuExternalLink size={12} className="gh-repo-card__ext" />
                </div>
                {repo.description && <p className="gh-repo-card__desc">{repo.description}</p>}
                <div className="gh-repo-card__meta">
                  {repo.language && (
                    <span className="gh-repo-card__lang">
                      <span className="gh-lang-dot" style={{ background: getLangColor(repo.language) }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && <span className="gh-repo-card__stars"><LuStar size={11} /> {repo.stars}</span>}
                  {repo.forks > 0 && <span className="gh-repo-card__forks"><LuGitFork size={11} /> {repo.forks}</span>}
                  <span className="gh-repo-card__updated">{timeAgo(repo.updatedAt)}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* KONTRIBUSI (hanya GraphQL mode) */}
        {activeTab === "contribs" && isGraphQL && contribs && (
          <div className="gh-widget__contribs-detail">
            <div className="gh-contribs-grid">
              <div className="gh-contrib-card">
                <LuGitCommitHorizontal size={20} className="gh-contrib-card__icon gh-contrib-card__icon--blue" />
                <span className="gh-contrib-card__val">{formatNumber(contribs.commits)}</span>
                <span className="gh-contrib-card__lbl">Commits</span>
              </div>
              <div className="gh-contrib-card">
                <LuGitPullRequest size={20} className="gh-contrib-card__icon gh-contrib-card__icon--purple" />
                <span className="gh-contrib-card__val">{formatNumber(contribs.prs)}</span>
                <span className="gh-contrib-card__lbl">Pull Requests</span>
              </div>
              <div className="gh-contrib-card">
                <LuCircleDot size={20} className="gh-contrib-card__icon gh-contrib-card__icon--amber" />
                <span className="gh-contrib-card__val">{formatNumber(contribs.issues)}</span>
                <span className="gh-contrib-card__lbl">Issues</span>
              </div>
              <div className="gh-contrib-card">
                <LuShield size={20} className="gh-contrib-card__icon gh-contrib-card__icon--green" />
                <span className="gh-contrib-card__val">{formatNumber(contribs.reviews)}</span>
                <span className="gh-contrib-card__lbl">Reviews</span>
              </div>
            </div>

            {hasPrivate && (
              <div className="gh-private-contrib-banner">
                <LuLock size={14} />
                <div>
                  <strong>{contribs.private}</strong> kontribusi dari repo private disertakan secara anonim.
                  <br/>
                  <span className="gh-private-note-sub">Nama & kode repo tidak ditampilkan.</span>
                </div>
              </div>
            )}

            <div className="gh-streak-row">
              <div className="gh-streak-item">
                <span className="gh-streak-val">🔥 {currentStreak}</span>
                <span className="gh-streak-lbl">Current Streak (hari)</span>
              </div>
              <div className="gh-streak-item">
                <span className="gh-streak-val">⚡ {longestStreak}</span>
                <span className="gh-streak-lbl">Longest Streak (hari)</span>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVITY (REST mode) */}
        {activeTab === "activity" && !isGraphQL && (
          <div className="gh-widget__activity">
            {recentActivity.length === 0 ? (
              <p className="gh-widget__empty">No recent activity</p>
            ) : recentActivity.map((ev, i) => (
              <div key={i} className="gh-activity__item">
                <ActivityIcon type={ev.type} />
                <div className="gh-activity__info">
                  <span className="gh-activity__action">{ev.type.replace("Event", "")}</span>
                  <span className="gh-activity__repo">{ev.repo}</span>
                </div>
                <span className="gh-activity__time">{timeAgo(ev.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── Footer ─── */}
      <div className="gh-widget__footer">
        <span className="gh-widget__footer-text">
          <LuGithub size={12} />
          {isGraphQL ? "GraphQL API • Private incl. • " : "REST API • "}
          Cached 10min
        </span>
        <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="gh-widget__view-profile">
          View Profile ↗
        </a>
      </div>
    </div>
  );
}

function GitHubSkeleton() {
  return (
    <div className="gh-widget gh-widget--skeleton">
      <div className="gh-skeleton__header">
        <div className="gh-skeleton__avatar" />
        <div className="gh-skeleton__info">
          <div className="gh-skeleton__line gh-skeleton__line--name" />
          <div className="gh-skeleton__line gh-skeleton__line--login" />
        </div>
      </div>
      <div className="gh-skeleton__stats">
        {[1,2,3,4,5].map(i => <div key={i} className="gh-skeleton__stat" />)}
      </div>
      <div className="gh-skeleton__bars">
        <div className="gh-skeleton__line gh-skeleton__line--full" />
        <div className="gh-skeleton__lang-bar" />
        <div className="gh-skeleton__heatmap" />
      </div>
    </div>
  );
}
