import { useNavigate } from 'react-router';
import LoginButton from '../LoginButton';

const EmailLoginButton = () => {
  const navigate = useNavigate();

  return (
    <LoginButton
      imgSrc="/src/assets/email-login.png"
      altText="Email Login"
      additionalStyles="mb-3"
      onClick={() => navigate('/email-login')}
    />
  );
};

export default EmailLoginButton;
