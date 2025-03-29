// import HeaderButton from '@common/Header/HeaderButton';
// import BackIcon from '@icons/BackIcon';
// import PageLayout from '@layout/PageLayout';
import RsvpItem from '@common/RsvpItem/RsvpItem';
import { useGetAttendances, useGetStats } from '@/hooks/useStats';
import { GuestInfo } from '@/types/GuestType';
import { downloadRsvpExcel } from '@/utils/excelDownloader';
import statsIcon from '@assets/statsIcon.svg';
import listIcon from '@assets/listIcon.svg';


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

  const { data: stats } = useGetStats() as { data: StatsResponse | undefined };

  // useGetAttendances의 반환 타입을 명확하게 지정
  const { data } = useGetAttendances(1, 10) as {
    data: AttendanceResponse | undefined;
  };

  // allAttendances를 추출하고, 배열이 아닐 경우 빈 배열로 처리
  const attendanceList = Array.isArray(data?.allAttendances)
    ? data.allAttendances
    : [];
  const statsList = Array.isArray(stats?.allAttendances)
    ? stats.allAttendances
    : [];

  const totalResponses = statsList.length;
  const totalAttending = statsList.filter((g) => g.attendance).length;
  const totalNotAttending = statsList.filter((g) => !g.attendance).length;

  const groomAttending = statsList.filter(
    (g) => g.isGroomSide && g.attendance,
  ).length;
  const groomNotAttending = statsList.filter(
    (g) => g.isGroomSide && !g.attendance,
  ).length;

  const brideAttending = statsList.filter(
    (g) => g.isBrideSide && g.attendance,
  ).length;
  const brideNotAttending = statsList.filter(
    (g) => g.isBrideSide && !g.attendance,
  ).length;

  const mealAvailable = statsList.filter((g) => g.isDining === '예정').length;
  const mealNotAvailable = statsList.filter(
    (g) => g.isDining === '안함',
  ).length;
  const mealPending = statsList.filter((g) => g.isDining === '미정').length;

  console.log('Attendances Data:', attendanceList);
  console.log('Stats Data:', statsList);

  return (
    // <PageLayout
    //   title="참석여부 집계 요약"
    //   leftButton={
    //     <HeaderButton onClick={() => navigate('/mypage')}>
    //       <BackIcon />
    //     </HeaderButton>
    //   }
    //   customFooter={null}
    // >
    <main>
      <section className="mb-5 mx-3">
        <h6 className="flex items-center gap-2 text-xs font-medium text-[#535353] my-4" onClick={() => downloadRsvpExcel(attendanceList)}>
          {/* 아이콘 */}
          <img src={statsIcon} alt="stats" />
          <span>하객 분류</span>
        </h6>

        <article className="h-fit bg-white rounded-xl w-full p-4">
          <RsvpItem title={'총 응답 수'} attend={totalResponses} total={true} />
          <div className="grid grid-cols-2">
            <RsvpItem title={'참석 가능'} attend={totalAttending} />
            <RsvpItem title={'참석 불가'} attend={totalNotAttending} />
            <RsvpItem
              title={'신랑측'}
              description="( 가능 / 불가 )"
              attend={groomAttending}
              unattend={groomNotAttending}
              bride={false}
            />
            <RsvpItem
              title={'신부측'}
              description="( 가능 / 불가 )"
              attend={brideAttending}
              unattend={brideNotAttending}
              bride={true}
            />
          </div>
          <div className="grid col-span-3 grid-cols-3">
            <RsvpItem title={'식사 가능'} attend={mealAvailable} />
            <RsvpItem title={'식사 불가'} attend={mealNotAvailable} />
            <RsvpItem title={'식사 미정'} attend={mealPending} />
          </div>
        </article>
      </section>


      <section className="flex-1 mx-3">
        <div className='flex justify-between'>
          <h6 className="flex items-center gap-2 text-xs font-medium text-[#535353]">
            <img src={listIcon} alt="stats" />
            <span>상세 목록</span>
          </h6>
          <button className='border border-gray-300 rounded-xl my-4 px-2 hover:opacity-80 transition'>
            <img src="/src/assets/microsoft-excel-128.png" alt="엑셀 파일 다운로드" className="w-8 h-8" />
          </button>
        </div>

        <article className="flex flex-col">

          {/* 테이블 헤더 */}
          <header className="grid grid-cols-[2.5fr_2.2fr_0.7fr_0.7fr] bg-gray-100 text-sm font-medium text-center py-2 rounded-t-lg border border-gray-300">
            <span>이름</span>
            <span>연락처</span>
            <span>참석</span>
            <span>식사</span>
          </header>

          {/* 데이터 목록 */}
          {attendanceList.length > 0 ? (
            attendanceList.map((attendance) => (
              <div
                key={attendance.id}
                className="grid grid-cols-[2.5fr_2.2fr_0.7fr_0.7fr] text-center py-2 border border-gray-300"
              >
                <span>{`${attendance.name}님 외 ${attendance.companions}명`}</span>
                <span>{attendance.contact}</span>
                <span>{attendance.attendance ? 'O' : 'X'}</span>
                <span>
                  {attendance.isDining === '예정'
                    ? 'O'
                    : attendance.isDining === '미정'
                      ? '-'
                      : 'X'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 py-8">
              참석 데이터가 없습니다.
            </p>
          )}
        </article>
      </section>
    </main>

    // </PageLayout>
  );
};

export default RsvpStatsPage;
