import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import AccountInput from './AccountInput';

const AccountFeature = () => {
  return (
    <>
      <InformationItem
        messages={[
          '축의금 기능에서 사용되는 정보입니다.',
          '입력한 계좌번호만 노출되며, 카카오 송금 QR은 선택 사항입니다.',
        ]}
      />
      <AccountInput />
    </>
  );
};

export default AccountFeature;
