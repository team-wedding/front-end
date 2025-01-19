import EditIcon from '../components/icons/EditIcon';
import BackIcon from '../components/icons/BackIcon';
import ShareIcon from '../components/icons/ShareIcon';
import TrashIcon from '../components/icons/TrashIcon';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import ResultDisplay from '../components/display/ResultDisplay';
import { useNavigate } from 'react-router';

const PreviewInvitaionPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/create');
  };

  return (
    <PageLayout
      leftButton={
        <HeaderButton onClick={handleBack}>
          <BackIcon />
        </HeaderButton>
      }
      rightButton={
        <div className="flex space-x-4">
          <HeaderButton onClick={() => console.log('수정하기 클릭')}>
            <EditIcon />
          </HeaderButton>
          <HeaderButton onClick={() => console.log('공유하기 클릭')}>
            <ShareIcon />
          </HeaderButton>
          <HeaderButton onClick={() => console.log('삭제하기 클릭')}>
            <TrashIcon />
          </HeaderButton>
        </div>
      }
    >
      <div className="preview-layout">
        <ResultDisplay />
      </div>
    </PageLayout>
  );
};

export default PreviewInvitaionPage;
