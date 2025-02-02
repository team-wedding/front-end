import ReusableModal from "../common/Modal/ReusableModal";

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const LogoutModal = ({ isOpen, onConfirm, onCancel }: LogoutModalProps) => {
    return (
        <ReusableModal
            isOpen={isOpen}
            title="로그아웃 하시겠습니까?"
            confirmText="확인"
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    );
};

export default LogoutModal;