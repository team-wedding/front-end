import React, { useRef, useState } from 'react';
import { musicData } from '../../../../constants/musicData';
import MusicPlayer from './MusicPlayer';
import { useMusicFeatureStore } from '../../../../store/OptionalFeature/useMusicFeatureStore';

const MusicItem = () => {
  const { selectMusic, selectedMusic } = useMusicFeatureStore();
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const audioRefs = useRef<{ [id: number]: HTMLAudioElement | null }>({});

  const handlePlayPause = (id: number, musicSrc: string) => {
    if (currentPlaying !== null && currentPlaying !== id) {
      const prevAudio = audioRefs.current[currentPlaying];
      if (prevAudio) {
        prevAudio.pause();
        prevAudio.currentTime = 0;
      }
    }

    if (!audioRefs.current[id]) {
      audioRefs.current[id] = new Audio(musicSrc);
    }

    const currentAudio = audioRefs.current[id];

    if (currentPlaying === id) {
      currentAudio.pause();
      setCurrentPlaying(null);
      // selectMusic({ id: null, title: '', src: '' });
    } else {
      currentAudio.play();
      setCurrentPlaying(id);
      // selectMusic({ id, title, src: musicSrc });
    }
  };

  const handleSelect = (id: number) => {
    // 음악 선택만 수행
    selectMusic(id);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setCurrentPlaying(null);

      Object.values(audioRefs.current).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
  };

  return (
    <div
      className="flex flex-col mx-2 my-6 gap-3 text-neutral-500"
      tabIndex={-1}
      onBlur={handleBlur}
    >
      {musicData.map(({ id, title, src }) => (
        <div
          key={id}
          className={`flex items-center justify-between px-5 py-1 gap-2 rounded-2xl select-btn hover:active-btn ${selectedMusic.id === id && 'active-btn'}`}
          onClick={() => handleSelect(id)}
        >
          <div>{title}</div>
          {/* <PlayButton
            isPlaying={currentPlaying === id}
            onPlayPause={() => handlePlayPause(id, src)}
          /> */}
          <MusicPlayer
            musicSrc={src}
            isPlaying={currentPlaying === id}
            onPlayPause={() => handlePlayPause(id, src)}
          />
        </div>
      ))}
    </div>
  );
};

export default MusicItem;
