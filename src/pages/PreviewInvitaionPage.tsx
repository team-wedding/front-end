import BackIcon from '@icons/BackIcon';
// import ShareIcon from '@icons/ShareIcon';
// import TrashIcon from '@icons/TrashIcon';
// import EditIcon from '@icons/EditIcon';
import PageLayout from '@layout/PageLayout';
import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate } from 'react-router';
import PreviewDisplay from '@/components/display/PreviewDisplay';

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
      title="미리보기"
      // rightButton={
      //   <div className="flex space-x-4">
      //     <HeaderButton onClick={() => console.log('수정하기 클릭')}>
      //       <EditIcon />
      //     </HeaderButton>
      //     <HeaderButton onClick={() => console.log('공유하기 클릭')}>
      //       <ShareIcon />
      //     </HeaderButton>
      //     <HeaderButton onClick={() => console.log('삭제하기 클릭')}>
      //       <TrashIcon />
      //     </HeaderButton>
      //   </div>
      // }
      customFooter={null}
    >
      <div className="">
        <PreviewDisplay />
      </div>
    </PageLayout>
  );
};

export default PreviewInvitaionPage;
