export const calculateDday = (
  targetDate: Date | undefined,
  targetTime: { hour: number | null; minute: number | null },
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null => {
  if (
    !targetDate ||
    !targetTime ||
    targetTime.hour === null ||
    targetTime.minute === null
  )
    return null;

  const { hour, minute } = targetTime;

  const fullTargetDate = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    hour,
    minute,
  );

  // 현재 시간
  const now = new Date();

  // 남은 시간 계산
  const diffTime = fullTargetDate.getTime() - now.getTime();

  // 초, 분, 시간, 일 단위 계산
  const totalSeconds = Math.floor(diffTime / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return { days, hours, minutes, seconds };
};
