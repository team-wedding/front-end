import { useEffect, useRef, useState } from 'react';
import PlayButton from '../../form/Theme/MusicFeature/PlayButton';
import { useOptionalFeatureStore } from '../../../store/OptionalFeature/useOptionalFeatureStore';
import { useMusicFeatureStore } from '../../../store/OptionalFeature/useMusicFeatureStore';

const MusicSection = () => {
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  // const { isPlaying, setIsPlaying } = useState(true);
  // const { selectedMusic } = useMusicFeatureStore();
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const isMusicFeatureActive = selectedOptionalFeatures.music;

  // const handlePlayPause = () => {
  //   setIsPlaying(!isPlaying);
  // };

  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.pause();
  //     audioRef.current = null;
  //   }

  //   if (selectedMusic.src) {
  //     audioRef.current = new Audio(selectedMusic.src);
  //     audioRef.current.play().catch((error) => {
  //       console.error('Failed to play audio:', error);
  //     });
  //   }

  //   return () => {
  //     if (audioRef.current) {
  //       audioRef.current.pause();
  //       audioRef.current = null;
  //     }
  //   };
  // }, [selectedMusic]);

  return (
    isMusicFeatureActive && (
      <div className="absolute top-3 right-6 transition-all duration-300">
        <PlayButton isPlaying={false} onPlayPause={() => {}} />
      </div>
    )
  );
};

export default MusicSection;
