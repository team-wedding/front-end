import EditIcon from '../components/icons/EditIcon';
import BackIcon from '../components/icons/BackIcon';
import ShareIcon from '../components/icons/ShareIcon';
import TrashIcon from '../components/icons/TrashIcon';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import ResultDisplay from '../components/display/ResultDisplay';
import { API } from '../utils/config';
import { getInvitationDetail } from "../constants/invitaionDetailData";
import { useUserStore } from '../store/useUserStore';


const PreviewInvitaionPage = () => {
  const handleBack = () => {
    console.log('전으로 돌아가기');
  };
  const invitationDetail = getInvitationDetail();
  const { token } = useUserStore();
  const handleSave = () => {
    fetch(`${API.INVITATIONS}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(invitationDetail),
      }
    ).then((response) => {
      if (response.status == 201) {
      } else throw new Error(`${response.status}에러`)
    }).then(() => {
    })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  //로그아웃


  return (
    <PageLayout
      leftButton={
        <HeaderButton onClick={handleBack}>
          <BackIcon />
        </HeaderButton>
      }
      rightButton={
        <div className="flex space-x-4">
          <HeaderButton onClick={handleSave}>
            <div>저장</div>
          </HeaderButton>
          {/* <HeaderButton onClick={() => console.log('공유하기 클릭')}>
            <ShareIcon />
          </HeaderButton>
          <HeaderButton onClick={() => console.log('삭제하기 클릭')}>
            <TrashIcon />
          </HeaderButton> */}
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
