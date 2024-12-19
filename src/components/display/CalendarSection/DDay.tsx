import React, { useEffect, useState } from 'react';
import { calculateDday } from '../../../utils/dateUtils';

type WeddingDDayProps = {
  targetDate: Date | null;
  targetTime: string | null;
};

const DDay: React.FC<WeddingDDayProps> = ({ targetDate, targetTime }) => {
  const [dday, setDday] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // 두 자리 수로 포맷팅하는 함수
  const formatNumber = (num: number | undefined): string => {
    return num !== undefined ? String(num).padStart(2, '0') : '00';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const result = calculateDday(targetDate, targetTime);
      setDday(result);
    }, 1000); // 1초마다 디데이 계산

    return () => clearInterval(interval); // 언마운트
  }, [targetDate, targetTime]); // 의존성 변경 (날짜, 시간 변경될 때마다 실행)

  const timeUnits = [
    { label: 'DAYS', value: formatNumber(dday?.days) },
    { label: 'HOUR', value: formatNumber(dday?.hours) },
    { label: 'MIN', value: formatNumber(dday?.minutes) },
    { label: 'SEC', value: formatNumber(dday?.seconds) },
  ];

  return (
    <div className="flex justify-center items-center gap-2">
      {timeUnits.map((dday, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center justify-center leading-none">
            <div className="text-[8px] text-gray-400 -tracking-wide font-normal">
              {dday.label}
            </div>
            <div className="my-3 tracking-wide font-normal">
              {dday.value !== undefined ? dday.value : '00'}
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <div className="text-xs leading-none mx-1 text-gray-400">:</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DDay;
