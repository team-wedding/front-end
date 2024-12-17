export const calculateDday = (
  targetDate: Date | null,
  targetTime: string | null,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null => {
  if (!targetDate || !targetTime) return null;

  const [targetHours, targetMinutes] = targetTime.split(':').map(Number);

  const fullTargetDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    targetHours,
    targetMinutes,
  );

  const now = new Date();

  const diffTime = fullTargetDate.getTime() - now.getTime();

  const totalSeconds = Math.floor(diffTime / 1000); // 밀리초?
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds };
};
