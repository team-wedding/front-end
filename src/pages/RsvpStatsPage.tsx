import BackIcon from '../components/icons/BackIcon';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';

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
      <p>참석여부 통계 페이지</p>
    </PageLayout>
  );
};

export default RsvpStatsPage;
