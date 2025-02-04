import HeaderButton from '@common/Header/HeaderButton';
import BackIcon from '@icons/BackIcon';
import PageLayout from '@layout/PageLayout';
import RsvpItem from '@common/RsvpItem/RsvpItem';
import { useNavigate } from 'react-router';
import { useGetAttendances, useGetStats } from '@/hooks/useStats';
import { GuestInfo } from '@/types/GuestType';

// API 응답 데이터 타입을 명확하게 정의
interface AttendanceResponse {
  allAttendances: GuestInfo[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface StatsResponse {
  allAttendances: GuestInfo[];
}

const RsvpStatsPage = () => {
  const navigate = useNavigate();

  const { data: stats } = useGetStats() as { data: StatsResponse | undefined };

  // useGetAttendances의 반환 타입을 명확하게 지정
  const { data } = useGetAttendances(1, 10) as { data: AttendanceResponse | undefined };

  // allAttendances를 추출하고, 배열이 아닐 경우 빈 배열로 처리
  const attendanceList = Array.isArray(data?.allAttendances) ? data.allAttendances : [];
  const statsList = Array.isArray(stats?.allAttendances) ? stats.allAttendances : [];

  const totalResponses = statsList.length;
  const totalAttending = statsList.filter((g) => g.attendance).length;
  const totalNotAttending = statsList.filter((g) => !g.attendance).length;

  const groomAttending = statsList.filter((g) => g.isGroomSide && g.attendance).length;
  const groomNotAttending = statsList.filter((g) => g.isGroomSide && !g.attendance).length;

  const brideAttending = statsList.filter((g) => g.isBrideSide && g.attendance).length;
  const brideNotAttending = statsList.filter((g) => g.isBrideSide && !g.attendance).length;

  const mealAvailable = statsList.filter((g) => g.isDining === '예정').length;
  const mealNotAvailable = statsList.filter((g) => g.isDining === '안함').length;
  const mealPending = statsList.filter((g) => g.isDining === '미정').length;

  console.log("Attendances Data:", attendanceList);
  console.log("Stats Data:", statsList);

  return (
    <PageLayout
      title="참석여부 집계 요약"
      leftButton={
        <HeaderButton onClick={() => navigate('/mypage')}>
          <BackIcon />
        </HeaderButton>
      }
      customFooter={null}
    >
      <section className="h-fit 6 px-2 pb-6">
        <div className="px-4 pt-2 pb-3">
          <div className="text-xl font-medium pl-2 py-4">하객 분류</div>
          <RsvpItem title={'총 응답 수'} attend={totalResponses} total={true} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <RsvpItem title={'참석 가능'} attend={totalAttending} />
            <RsvpItem title={'참석 불가'} attend={totalNotAttending} />
            <RsvpItem
              title={'신랑측'}
              description="(참석 가능 / 불가)"
              attend={groomAttending}
              unattend={groomNotAttending}
              bride={false}
            />
            <RsvpItem
              title={'신부측'}
              description="(참석 가능 / 불가)"
              attend={brideAttending}
              unattend={brideNotAttending}
              bride={true}
            />
          </div>
          <div className="grid col-span-3 grid-cols-3 gap-2 mt-2 ">
            <RsvpItem title={'식사 가능'} attend={mealAvailable} />
            <RsvpItem title={'식사 불가'} attend={mealNotAvailable} />
            <RsvpItem title={'식사 미정'} attend={mealPending} />
          </div>
        </div>

        <div className="text-xl font-medium px-4 py-2">상세 목록</div>
        <section className="flex flex-col px-4 py-2">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[2.5fr_2.2fr_0.7fr_0.7fr] bg-gray-200 font-medium text-center py-2 rounded-t-lg border border-gray-300">
            <span>이름</span>
            <span>연락처</span>
            <span>참석</span>
            <span>식사</span>
          </div>

          {/* 데이터 목록 */}
          {attendanceList.length > 0 ? (
            attendanceList.map((attendance) => (
              <div
                key={attendance.id}
                className="grid grid-cols-[2.5fr_2.2fr_0.7fr_0.7fr] text-center py-2 border border-gray-300"
              >
                <span>{`${attendance.name}님 외 ${attendance.companions}명`}</span>
                <span>{attendance.contact}</span>
                <span>
                  {attendance.attendance ? "O" : "X"}
                </span>
                <span>
                  {attendance.isDining === "예정" ? "O" : attendance.isDining === "미정" ? "-" : "X"}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">참석 데이터가 없습니다.</div>
          )}
        </section>
      </section>
    </PageLayout>
  );
};

export default RsvpStatsPage;