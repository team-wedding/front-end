import HeaderButton from '@/components/common/Header/HeaderButton';
import PhotoTalkList from '@/components/common/PhotoTalk/PhotoTalkList';
import BackIcon from '@/components/icons/BackIcon';
import PageLayout from '@/components/layout/PageLayout';
import { useNavigate } from 'react-router';

const AdminPhotoTalkPage = () => {
  const navigate = useNavigate();
  return (
    <PageLayout
      title="포토톡"
      leftButton={
        <HeaderButton onClick={() => navigate('/mypage')}>
          <BackIcon />
        </HeaderButton>
      }
      customFooter={null}
    >
      <div className="column-center w-full flex flex-col py-6">
        <PhotoTalkList isAdmin={true} />
      </div>
    </PageLayout>
  );
};

export default AdminPhotoTalkPage;
