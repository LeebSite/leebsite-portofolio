import React, { useState, useEffect } from "react";
import { LuGithub, LuStar, LuGitFork, LuUsers, LuCode, LuTrendingUp, LuExternalLink, LuRefreshCw, LuCalendar } from "react-icons/lu";
import "./GitHubStatsWidget.css";

const GITHUB_USERNAME = "LeebSite";
const CACHE_KEY = "gh_stats_cache";
const CACHE_TTL = 10 * 60 * 1000; // 10 menit

// Warna bahasa pemrograman
const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  PHP:        "#4F5D95",
  Java:       "#b07219",
  Blade:      "#f7523f",
  "C#":       "#178600",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Dart:       "#00B4AB",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  Vue:        "#41b883",
  Swift:      "#ffac45",
};

function getLangColor(lang) {
  return LANG_COLORS[lang] || "#8b949e";
}

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = Date.now();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return diff + "s ago";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  if (diff < 86400 * 30) return Math.floor(diff / 86400) + "d ago";
  if (diff < 86400 * 365) return Math.floor(diff / (86400 * 30)) + "mo ago";
  return Math.floor(diff / (86400 * 365)) + "y ago";
}

async function fetchGitHubStats() {
  // Cek cache
  const cached = sessionStorage.getItem(CACHE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Date.now() - parsed.ts < CACHE_TTL) return parsed.data;
  }

  const headers = { "User-Agent": "portfolio-leebsite" };

  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`, { headers }),
  ]);

  if (!userRes.ok) throw new Error("GitHub API rate limit or user not found");

  const user = await userRes.json();
  const repos = await reposRes.json();
  const events = await eventsRes.json();

  // Top 5 languages by repo count
  const langCount = {};
  let totalStars = 0;
  let totalForks = 0;
  repos.forEach(r => {
    if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    totalStars += r.stargazers_count || 0;
    totalForks += r.forks_count || 0;
  });
  const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({ lang, count, pct: Math.round((count / totalLangRepos) * 100) }));

  // Recent repos (top 3 updated)
  const recentRepos = repos
    .filter(r => !r.fork)
    .slice(0, 4)
    .map(r => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      updatedAt: r.updated_at,
    }));

  // Recent activity
  const recentActivity = events.slice(0, 6).map(e => ({
    type: e.type,
    repo: e.repo?.name?.split("/")[1] || e.repo?.name,
    createdAt: e.created_at,
  }));

  const data = {
    user: {
      name: user.name,
      login: user.login,
      avatar: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      profileUrl: user.html_url,
      createdAt: user.created_at,
    },
    totalStars,
    totalForks,
    topLanguages,
    recentRepos,
    recentActivity,
  };

  sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  return data;
}

function ActivityIcon({ type }) {
  const icons = {
    PushEvent:           { emoji: "⬆️", label: "Pushed" },
    CreateEvent:         { emoji: "✨", label: "Created" },
    PullRequestEvent:    { emoji: "🔀", label: "PR" },
    IssuesEvent:         { emoji: "🐛", label: "Issue" },
    WatchEvent:          { emoji: "⭐", label: "Starred" },
    ForkEvent:           { emoji: "🍴", label: "Forked" },
    DeleteEvent:         { emoji: "🗑️", label: "Deleted" },
    IssueCommentEvent:   { emoji: "💬", label: "Commented" },
  };
  const item = icons[type] || { emoji: "⚡", label: "Activity" };
  return (
    <span className="gh-activity__icon" title={item.label}>
      {item.emoji}
    </span>
  );
}

export default function GitHubStatsWidget() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview | repos | activity

  const load = async (forceRefresh = false) => {
    if (forceRefresh) {
      sessionStorage.removeItem(CACHE_KEY);
      setRefreshing(true);
    }
    setError(null);
    try {
      const data = await fetchGitHubStats();
      setStats(data);
    } catch (e) {
      setError(e.message || "Failed to load GitHub stats");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <GitHubSkeleton />;

  if (error) {
    return (
      <div className="gh-widget gh-widget--error">
        <LuGithub className="gh-widget__error-icon" />
        <p className="gh-widget__error-text">{error}</p>
        <button className="gh-widget__retry-btn" onClick={() => load(true)}>Try Again</button>
      </div>
    );
  }

  const { user, totalStars, totalForks, topLanguages, recentRepos, recentActivity } = stats;

  return (
    <div className="gh-widget">
      {/* Header */}
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
          <button
            className={"gh-widget__refresh" + (refreshing ? " gh-widget__refresh--spinning" : "")}
            onClick={() => load(true)}
            title="Refresh data"
          >
            <LuRefreshCw size={14} />
          </button>
          <div className="gh-widget__live-badge">
            <span className="gh-widget__live-dot" />
            Live
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="gh-widget__stats-bar">
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
          <LuGitFork size={14} className="gh-widget__stat-icon gh-widget__stat-icon--blue" />
          <span className="gh-widget__stat-val">{formatNumber(totalForks)}</span>
          <span className="gh-widget__stat-lbl">Forks</span>
        </div>
        <div className="gh-widget__stat-divider" />
        <div className="gh-widget__stat-item">
          <LuUsers size={14} className="gh-widget__stat-icon gh-widget__stat-icon--purple" />
          <span className="gh-widget__stat-val">{formatNumber(user.followers)}</span>
          <span className="gh-widget__stat-lbl">Followers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="gh-widget__tabs">
        {["overview", "repos", "activity"].map(tab => (
          <button
            key={tab}
            className={"gh-widget__tab" + (activeTab === tab ? " gh-widget__tab--active" : "")}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" && <LuTrendingUp size={12} />}
            {tab === "repos" && <LuCode size={12} />}
            {tab === "activity" && <LuCalendar size={12} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="gh-widget__body">

        {/* OVERVIEW: Top Languages */}
        {activeTab === "overview" && (
          <div className="gh-widget__overview">
            <p className="gh-widget__section-label">Top Languages</p>
            <div className="gh-lang-bar">
              {topLanguages.map(({ lang, pct }) => (
                <div
                  key={lang}
                  className="gh-lang-bar__segment"
                  style={{ width: pct + "%", background: getLangColor(lang) }}
                  title={`${lang}: ${pct}%`}
                />
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

            {/* Contribution Graph Placeholder via GitHub Readme Stats */}
            <div className="gh-widget__contrib-wrap">
              <p className="gh-widget__section-label">Contribution Graph</p>
              <div className="gh-widget__contrib-img-wrap">
                <img
                  src={`https://ghchart.rshah.org/3b82f6/${GITHUB_USERNAME}`}
                  alt="GitHub Contribution Chart"
                  className="gh-widget__contrib-img"
                  loading="lazy"
                  onError={(e) => { e.target.closest('.gh-widget__contrib-img-wrap').style.display='none'; }}
                />
              </div>
            </div>
          </div>
        )}

        {/* REPOS: Recent Repos */}
        {activeTab === "repos" && (
          <div className="gh-widget__repos">
            {recentRepos.map(repo => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gh-repo-card"
              >
                <div className="gh-repo-card__top">
                  <LuCode size={14} className="gh-repo-card__code-icon" />
                  <span className="gh-repo-card__name">{repo.name}</span>
                  <LuExternalLink size={12} className="gh-repo-card__ext" />
                </div>
                {repo.description && (
                  <p className="gh-repo-card__desc">{repo.description}</p>
                )}
                <div className="gh-repo-card__meta">
                  {repo.language && (
                    <span className="gh-repo-card__lang">
                      <span className="gh-lang-dot" style={{ background: getLangColor(repo.language) }} />
                      {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && (
                    <span className="gh-repo-card__stars">
                      <LuStar size={11} /> {repo.stars}
                    </span>
                  )}
                  {repo.forks > 0 && (
                    <span className="gh-repo-card__forks">
                      <LuGitFork size={11} /> {repo.forks}
                    </span>
                  )}
                  <span className="gh-repo-card__updated">{timeAgo(repo.updatedAt)}</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* ACTIVITY: Recent Events */}
        {activeTab === "activity" && (
          <div className="gh-widget__activity">
            {recentActivity.length === 0 ? (
              <p className="gh-widget__empty">No recent activity</p>
            ) : (
              recentActivity.map((ev, i) => (
                <div key={i} className="gh-activity__item">
                  <ActivityIcon type={ev.type} />
                  <div className="gh-activity__info">
                    <span className="gh-activity__action">{ev.type.replace("Event", "")}</span>
                    <span className="gh-activity__repo">{ev.repo}</span>
                  </div>
                  <span className="gh-activity__time">{timeAgo(ev.createdAt)}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="gh-widget__footer">
        <span className="gh-widget__footer-text">
          <LuGithub size={12} /> Data via GitHub REST API · Cached 10min
        </span>
        <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="gh-widget__view-profile">
          View Profile →
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
        {[1,2,3,4].map(i => <div key={i} className="gh-skeleton__stat" />)}
      </div>
      <div className="gh-skeleton__bars">
        <div className="gh-skeleton__line gh-skeleton__line--full" />
        <div className="gh-skeleton__lang-bar" />
        <div className="gh-skeleton__line gh-skeleton__line--half" />
      </div>
    </div>
  );
}
