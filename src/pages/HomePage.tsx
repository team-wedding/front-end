import { useEffect } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useUserStore } from '../store/useUserStore';
import { API } from '../utils/config';

const HomePage = () => {
  const { token } = useUserStore()
  useEffect(() => {
    fetch(`${API.INVITATIONS}`,
      {
        method: "GET",
        headers: {
          "Authorization": token
        },
      }
    ).then((response) => response.json()).then((data) => {
      console.log(data)
    })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [])
  return (
    <PageLayout title="우리 결혼해요">
    </PageLayout>
  );
};

export default HomePage;
