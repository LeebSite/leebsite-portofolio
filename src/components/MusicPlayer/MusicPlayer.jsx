import React, { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(150); // Start at 3:50
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
    const [audioError, setAudioError] = useState(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;

            // Set initial time to 2:13
            const setInitialTime = () => {
                audio.currentTime = 133;
                audio.removeEventListener('loadedmetadata', setInitialTime);
            };
            audio.addEventListener('loadedmetadata', setInitialTime);

            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);
            const handleError = (e) => {
                console.error('Audio error:', e);
                setAudioError('Failed to load audio file. Please check the file path.');
            };

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('error', handleError);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('error', handleError);
            };
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    const handleEnded = () => {
        if (repeatMode === 2) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else if (repeatMode === 1) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            setIsPlaying(false);
        }
    };

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                // Try to play
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    setIsPlaying(true);
                    setAudioError(null);
                }
            }
        } catch (error) {
            console.error('Play error:', error);
            setAudioError('Failed to play audio. ' + error.message);
            setIsPlaying(false);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const toggleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const toggleRepeat = () => {
        setRepeatMode((repeatMode + 1) % 3);
    };

    const skipForward = () => {
        audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
    };

    const skipBackward = () => {
        audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleImageError = () => {
        console.error('Failed to load album cover image');
        setImageError(true);
    };

    return (
        <div className="music-player-card">
            {/* Error Display */}
            {(audioError || imageError) && (
                <div style={{ background: '#ff4444', color: 'white', padding: '8px', borderRadius: '8px', marginBottom: '12px', fontSize: '12px' }}>
                    {audioError && <div>🎵 {audioError}</div>}
                    {imageError && <div>🖼️ Failed to load cover image</div>}
                </div>
            )}

            {/* Album Art */}
            <div className="album-art-container">
                <img
                    src="/alonicacover.jpg"
                    alt="LANY - Alonica"
                    onError={handleImageError}
                    onLoad={() => console.log('Image loaded successfully')}
                />
                <button className="favorite-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Song Info */}
            <div className="song-info">
                <h3 className="song-title">Alonica</h3>
                <p className="artist-name">LANY</p>
                <p className="song-duration">{formatTime(currentTime)}</p>
            </div>

            {/* Progress Bar */}
            <div className="progress-section">
                <div className="progress-bar-container">
                    <input
                        type="range"
                        name="seek-slider"
                        aria-label="Seek"
                        id="seek-slider"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="progress-bar"
                        style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, #4a4a4a ${(currentTime / duration) * 100}%, #4a4a4a 100%)`
                        }}
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="controls">
                <button
                    className={`control-btn ${isShuffle ? 'active' : ''}`}
                    onClick={toggleShuffle}
                    title="Shuffle"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                    </svg>
                </button>

                <button className="control-btn" onClick={skipBackward} title="Previous">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                </button>

                <button className="play-btn" onClick={togglePlay}>
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                <button className="control-btn" onClick={skipForward} title="Next">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                </button>

                <button
                    className={`control-btn ${repeatMode > 0 ? 'active' : ''}`}
                    onClick={toggleRepeat}
                    title={repeatMode === 0 ? 'Repeat Off' : repeatMode === 1 ? 'Repeat All' : 'Repeat One'}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                        {repeatMode === 2 && (
                            <text x="12" y="15" fontSize="10" textAnchor="middle" fill="currentColor">1</text>
                        )}
                    </svg>
                </button>
            </div>

            {/* Volume Control */}
            <div className="volume-section">
                <button className="volume-btn" onClick={toggleMute}>
                    {isMuted || volume === 0 ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                    ) : volume < 0.5 ? (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                    )}
                </button>
                <input
                    type="range"
                    name="volume-slider"
                    aria-label="Volume"
                    id="volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    style={{
                        background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, #4a4a4a ${(isMuted ? 0 : volume) * 100}%, #4a4a4a 100%)`
                    }}
                />
            </div>

            {/* Audio Element */}
            <audio
                ref={audioRef}
                src="/Lany-Alonica.mp3"
                preload="metadata"
                crossOrigin="anonymous"
                onLoadedData={() => console.log('Audio loaded successfully')}
                onError={(e) => console.error('Audio loading error:', e)}
            />
        </div>
    );
};

export default MusicPlayer;
