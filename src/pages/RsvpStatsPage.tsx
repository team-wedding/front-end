import HeaderButton from '@common/Header/HeaderButton';
import BackIcon from '@icons/BackIcon';
import PageLayout from '@layout/PageLayout';
import RsvpItem from '@common/RsvpItem/RsvpItem';
import AttendanceItem from '@common/AttendanceItem/AttendanceItem';

const RsvpStatsPage = () => {
  const handleBack = () => {
    console.log('전으로 돌아가기');
  };
  return (
    <PageLayout
      title="참석여부 집계 요약"
      leftButton={
        <HeaderButton onClick={handleBack}>
          <BackIcon />
        </HeaderButton>
      }
    >
      <section className="bg-red-100 h-fit 6 px-2 pb-6">
        <div className="px-4 pt-2 pb-3">
          <RsvpItem title={'총 응답 수'} attend={0} total={true} />
          <div className="grid grid-cols-2 gap-2 mt-2 ">
            <RsvpItem title={'참석 가능'} attend={0} />
            <RsvpItem title={'참석 불가'} attend={0} />
            <RsvpItem
              title={'신랑측'}
              description="(참석 가능 / 불가)"
              attend={0}
              unattend={100}
              bride={false}
            />
            <RsvpItem
              title={'신부측'}
              description="(참석 가능 / 불가)"
              attend={0}
              unattend={100}
              bride={true}
            />
          </div>
          <div className="grid col-span-3 grid-cols-3 gap-2 mt-2 ">
            <RsvpItem title={'식사 가능'} attend={10} />
            <RsvpItem title={'식사 불가'} attend={3} />
            <RsvpItem title={'식사 불가'} attend={3} />
          </div>
        </div>
        <div className="text-2xl pl-4">상세정보</div>
        <div className="w-full flex flex-row justify-between pl-9 pr-7 my-1">
          <span>이름</span>
          <span>연락처</span>
          <span>
            참석<span className="ml-3">식사</span>
          </span>
        </div>
        <section className="flex flex-col gap-2 px-4 py-2  h-96 overflow-y-scroll sm:gap-2">
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
          <AttendanceItem />
        </section>
      </section>
    </PageLayout>
  );
};

export default RsvpStatsPage;
