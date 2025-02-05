import { useNavigate } from 'react-router';
import LoginButton from '../LoginButton';
import emailLoginImg from '@assets/email-login.png'
const EmailLoginButton = () => {
  const navigate = useNavigate();

  return (
    <LoginButton
      imgSrc={emailLoginImg}
      altText="Email Login"
      additionalStyles="mb-3"
      onClick={() => navigate('/email-login')}
    />
  );
};

export default EmailLoginButton;
