import aBeautifulPlan from '@assets/music/aBeautifulPlan.mp3';
import beautifulMoments from '@assets/music/beautifulMoments.mp3';
import happyGoodMorning from '@assets/music/happyGoodMorning.mp3';
import loveStory from '@assets/music/loveStory.mp3';

export interface musicItemData {
  id: number;
  title: string;
  src: string;
}

export const musicData: musicItemData[] = [
  {
    id: 1,
    title: 'A Beautiful Plan',
    src: aBeautifulPlan,
  },
  {
    id: 2,
    title: 'Beautiful Moments',
    src: beautifulMoments,
  },
  {
    id: 3,
    title: 'Happy Good Morning',
    src: happyGoodMorning,
  },
  {
    id: 4,
    title: 'Love Story',
    src: loveStory,
  },
];
