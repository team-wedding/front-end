import { GuestInfo } from '@/types/guestTypes';

interface AttendanceProps {
  guestInfo: GuestInfo;
}

const AttendanceItem = ({ guestInfo }: AttendanceProps) => {
  const attendanceStatus = guestInfo.attendance ? 'O' : 'X';
  const diningStatus =
    guestInfo.isDining === '예정'
      ? 'O'
      : guestInfo.isDining === '미정'
        ? '-'
        : 'X';
  return (
    <div className="flex flex-row justify-around gap-1 bg-white p-3 rounded-xl border-2 border-solid border-gray-500">
      <div className="">
        {guestInfo.name}님 외 {guestInfo.companions}명
      </div>
      <div>{guestInfo.contact}</div>
      <div>{attendanceStatus}</div>
      <div>{diningStatus}</div>
    </div>
  );
};
export default AttendanceItem;
