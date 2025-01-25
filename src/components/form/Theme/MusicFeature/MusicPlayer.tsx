import { useEffect, useRef, useState } from 'react';
import PlayButton from './PlayButton';

interface MusicPlayerProps {
  musicSrc: string;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const MusicPlayer = ({
  musicSrc,
  isPlaying,
  onPlayPause,
}: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(musicSrc);
    }

    const currentAudio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(currentAudio.duration);
    };

    const handleTimeUpdate = () => {
      setProgress((currentAudio?.currentTime / currentAudio?.duration) * 100);
    };

    currentAudio?.addEventListener('loadedmetadata', handleLoadedMetadata);
    currentAudio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      currentAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [musicSrc]);

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audioRef.current.currentTime = newTime;
    setProgress((newTime / duration) * 100);
  };

  return (
    <div className="flex items-center gap-1">
      <PlayButton isPlaying={isPlaying} onPlayPause={() => onPlayPause()} />
      <div
        className="flex-grow bg-rose-100 h-1 rounded-full overflow-hidden w-10 relative"
        onClick={handleProgressClick}
      >
        <div
          className="absolute h-1 bg-rose-300 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default MusicPlayer;
