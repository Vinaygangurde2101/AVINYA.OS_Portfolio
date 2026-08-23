import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { wallpaperOptions } from '../../data/wallpapers';
import { RotateCcw, Volume2, VolumeX, Sparkles, Play, Film } from 'lucide-react';

export const Wallpaper: React.FC = () => {
  const wallpaperId = useSettingsStore((s) => s.wallpaperId);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const videoWallpaperMuted = useSettingsStore((s) => s.videoWallpaperMuted);
  const setVideoWallpaperMuted = useSettingsStore((s) => s.setVideoWallpaperMuted);
  const videoWallpaperReplayTrigger = useSettingsStore((s) => s.videoWallpaperReplayTrigger);
  const videoFreezeLastFrame = useSettingsStore((s) => s.videoFreezeLastFrame);
  const replayVideoWallpaper = useSettingsStore((s) => s.replayVideoWallpaper);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const activeWallpaper = useMemo(() => {
    return wallpaperOptions.find((w) => w.id === wallpaperId) || wallpaperOptions[0];
  }, [wallpaperId]);

  // Robust Video Playback Handler with Autoplay Policy & User Gesture Unmute
  useEffect(() => {
    if (activeWallpaper.isVideo && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = videoWallpaperMuted;
      
      const attemptPlay = async () => {
        try {
          await video.play();
          setIsPlaying(true);
          setIsVideoEnded(false);
        } catch (err) {
          console.warn('Browser blocked unmuted autoplay. Playing muted until first user interaction:', err);
          video.muted = true;
          try {
            await video.play();
            setIsPlaying(true);
            setIsVideoEnded(false);
          } catch (e) {
            console.error('Muted autoplay fallback failed:', e);
            setIsPlaying(false);
          }
        }
      };

      attemptPlay();
    }
  }, [activeWallpaper.id, videoWallpaperReplayTrigger]);

  // Global user interaction listener to un-mute audio as soon as user clicks anywhere
  useEffect(() => {
    const handleFirstGesture = () => {
      if (videoRef.current && activeWallpaper.isVideo) {
        if (!videoWallpaperMuted && videoRef.current.muted) {
          videoRef.current.muted = false;
        }
        if (videoRef.current.paused && !isVideoEnded) {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('pointerdown', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, [activeWallpaper.isVideo, videoWallpaperMuted, isVideoEnded]);

  // Sync mute state with video element dynamically when user toggles buttons
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = videoWallpaperMuted;
      if (!videoWallpaperMuted && videoRef.current.paused && !isVideoEnded) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [videoWallpaperMuted, isVideoEnded]);

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
    setIsPlaying(false);
    if (videoRef.current && videoFreezeLastFrame) {
      videoRef.current.pause();
      if (videoRef.current.duration) {
        videoRef.current.currentTime = Math.max(0, videoRef.current.duration - 0.05);
      }
    }
  };

  const handleReplayClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsVideoEnded(false);
    setIsPlaying(true);
    if (videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = videoWallpaperMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Replay play unmuted blocked, playing muted fallback:', err);
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }
    replayVideoWallpaper();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuteState = !videoWallpaperMuted;
    setVideoWallpaperMuted(nextMuteState);
    if (videoRef.current) {
      videoRef.current.muted = nextMuteState;
      if (!nextMuteState) {
        if (isVideoEnded) {
          setIsVideoEnded(false);
          setIsPlaying(true);
          videoRef.current.currentTime = 0;
        }
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeWallpaper.cssClass} z-0 overflow-hidden select-none`}>
      {/* AI Video Wallpaper Mode */}
      {activeWallpaper.isVideo ? (
        <div className="absolute inset-0 w-full h-full bg-[#05070d]">
          {/* Static Image Wallpaper (wp.png) - Cross-fades smoothly when video ends */}
          <img
            src={activeWallpaper.staticImage || '/wp.png'}
            alt="Static Wallpaper (wp.png)"
            className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-1000 ease-in-out ${
              isVideoEnded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Intro Video Element (home_video.mp4) - Fades out smoothly when video ends */}
          <video
            ref={videoRef}
            src={activeWallpaper.videoSrc || '/videos/home_video.mp4'}
            autoPlay
            playsInline
            preload="auto"
            muted={videoWallpaperMuted}
            onEnded={handleVideoEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 transition-opacity duration-1000 ease-in-out ${
              isVideoEnded ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* Vignette & Ambient Backdrop Shadows for UI contrast */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 z-1" />
        </div>
      ) : (
        /* Standard Static / Mesh Gradient Wallpaper Mode */
        <>
          {!reducedMotion && (
            <>
              {/* Main Central Radial Bloom Orb */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[160px] opacity-35 animate-pulse-slow pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${activeWallpaper.accentColor} 0%, rgba(2, 132, 199, 0.4) 40%, transparent 70%)`
                }}
              />

              {/* Top-Right Secondary Aurora Flare */}
              <div
                className="absolute -top-[15%] -right-[10%] w-[55vw] h-[55vw] rounded-full blur-[180px] opacity-30 animate-float pointer-events-none"
                style={{
                  background: `radial-gradient(circle, #38bdf8 0%, ${activeWallpaper.accentColor} 50%, transparent 80%)`
                }}
              />

              {/* Bottom-Left Ambient Glow */}
              <div
                className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[170px] opacity-25 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, #0284c7 0%, #0369a1 60%, transparent 85%)`
                }}
              />

              {/* Silk Wave SVG Curves overlaying for Windows 11 Bloom signature look */}
              <svg className="absolute inset-0 w-full h-full opacity-20 filter blur-xs pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none">
                <path
                  d="M-100 400C300 200 600 700 1000 300C1400 -100 1600 500 1800 400V900H-100V400Z"
                  fill="url(#bloomWave1)"
                />
                <path
                  d="M-100 500C200 300 700 600 1100 400C1500 200 1700 600 1900 500V900H-100V500Z"
                  fill="url(#bloomWave2)"
                />
                <defs>
                  <linearGradient id="bloomWave1" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="bloomWave2" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#075985" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </>
          )}

          {/* Stylish Right-Aligned Desktop Wallpaper Artwork */}
          <div className="absolute inset-0 flex flex-col items-end justify-center pointer-events-none select-none z-1 pr-6 sm:pr-12 md:pr-16 lg:pr-24">
            <div
              className="absolute right-0 top-0 bottom-0 w-[65%] pointer-events-none -z-20 opacity-80"
              style={{
                background: 'radial-gradient(ellipse at 85% 50%, rgba(3, 7, 18, 0.9) 0%, rgba(5, 7, 13, 0.5) 65%, transparent 100%)'
              }}
            />

            <div className="relative flex flex-col items-end text-right p-6 sm:p-8 rounded-3xl bg-slate-950/40 border border-white/5 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-2xl -translate-y-2">
              <div className="absolute -right-6 w-[350px] sm:w-[500px] h-[160px] sm:h-[200px] bg-gradient-to-r from-cyan-500/20 via-sky-400/25 to-indigo-600/20 blur-[100px] rounded-full -z-10 animate-pulse-slow" />

              <div className="flex items-center gap-2 mb-1.5 opacity-90">
                <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-cyan-400" />
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-cyan-300 font-extrabold drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]">
                  AVINYA.OS ◈ INTERACTIVE SYSTEM
                </span>
              </div>

              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-black tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-sky-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.4)] leading-tight uppercase font-sans mb-1"
                style={{ fontFamily: "'Outfit', 'Space Grotesk', sans-serif" }}
              >
                VINAY'S
              </h2>

              <h1
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-400/80 drop-shadow-[0_0_35px_rgba(6,182,212,0.5)] leading-none uppercase select-none"
                style={{ fontFamily: "'Outfit', 'Space Grotesk', sans-serif" }}
              >
                PORTFOLIO
              </h1>

              <div className="mt-3.5 sm:mt-4 px-4 sm:px-5 py-1.5 rounded-full bg-black/60 border border-cyan-500/35 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.6)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shadow-[0_0_10px_#34d399]" />
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.22em] text-cyan-200 uppercase font-bold">
                  Full-Stack Developer &amp; AI/ML Engineer
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.6) 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />
    </div>
  );
};

