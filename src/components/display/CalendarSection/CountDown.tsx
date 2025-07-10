import React, { useEffect, useState } from 'react';
import { calculateDday } from '@utils/dateUtils';

type CountDownProps = {
  targetDate: Date | undefined;
  targetTime: { hour: number | null; minute: number | null };
};

const CountDown: React.FC<CountDownProps> = ({ targetDate, targetTime }) => {
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
    <div className="flex-center gap-2 my-2">
      {timeUnits.map((dday, index) => (
        <div key={index} className="column-center gap-3">
          {/* <div className="column-center leading-none"> */}
          <div className="text-[10px] text-gray-300 tracking-wide font-light mr-2">
            {dday.label}
          </div>
          <div>
            <div className="flex-center">
              <div className="flex-center w-12 h-14 text-sm tracking-wide rounded-md shadow-md">
                {dday.value !== undefined ? dday.value : '00'}
              </div>
              {index < timeUnits.length - 1 && (
                <div className="ml-2 text-xs leading-none text-gray-400">:</div>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>
      ))}
    </div>
  );
};

export default CountDown;
