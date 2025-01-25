import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PauseCircleOutlineRoundedIcon from '@mui/icons-material/PauseCircleOutlineRounded';
import { IconButton } from '@mui/material';

interface PlayButtonProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

const PlayButton = ({ isPlaying, onPlayPause }: PlayButtonProps) => {
  return (
    <div className="flex items-center gap-1">
      <IconButton onClick={onPlayPause} size="small">
        {isPlaying ? (
          <PauseCircleOutlineRoundedIcon
            fontSize="small"
            className="text-black"
          />
        ) : (
          <PlayCircleOutlineRoundedIcon
            fontSize="small"
            className="text-neutral-300 hover:text-black"
          />
        )}
      </IconButton>
    </div>
  );
};

export default PlayButton;
