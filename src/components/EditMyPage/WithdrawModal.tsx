import ReusableModal from '../common/Modal/ReusableModal';

interface WithdrawModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const WithdrawModal = ({ isOpen, onConfirm, onCancel }: WithdrawModalProps) => {
  return (
    <ReusableModal
      isOpen={isOpen}
      title="회원탈퇴 하시겠습니까?"
      confirmText="확인"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default WithdrawModal;
