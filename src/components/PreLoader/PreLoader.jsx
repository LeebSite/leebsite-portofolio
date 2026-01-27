import { useState, useEffect, useMemo } from "react"
import "./PreLoader.css"

const PreLoader = () => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // Reduced to 2s for better UX

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progressRatio) * 100;

      setProgress(easeProgress);

      if (progressRatio < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => setLoading(false), 800);
        }, 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  // Easing function for smooth animation
  const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

  // Optimize: Calculate star positions once to prevent CLS on every render frame
  const stars = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${1 + Math.random() * 2}s`
      }
    }));
  }, []);

  if (!loading) return null

  return (
    <div
      className={`preloader-container ${fadeOut ? "preloader-fade-out" : ""}`}
    >
      {/* Animated gradient background - Dark Night Sky */}
      <div className="preloader-gradient-bg"></div>

      {/* Twinkling Stars */}
      <div className="stars-container">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={star.style}
          ></div>
        ))}
      </div>

      {/* Center Content: Percentage & Bar */}
      <div className="preloader-center-content">
        <div className="progress-number">
          {Math.round(progress)}%
        </div>

        <div className="progress-bar-center-bg">
          <div
            className="progress-bar-center-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default PreLoader
