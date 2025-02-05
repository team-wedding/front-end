import PageLayout from '@/components/layout/PageLayout';
import Login from '@/components/login/Login';

const LoginPage = () => {
  return (
    <PageLayout customHeader={false} customFooter={false}>
      <Login />
    </PageLayout>
  );
};

export default LoginPage;
