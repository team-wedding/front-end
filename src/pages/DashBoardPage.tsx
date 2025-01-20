import Card from '../components/common/Card/Card';
import PageLayout from '../components/layout/PageLayout';
import wedding1 from '../assets/image/wedding1.png';
import wedding2 from '../assets/image/wedding2.png';
import wedding3 from '../assets/image/wedding3.png';
import wedding4 from '../assets/image/wedding4.png';
import wedding5 from '../assets/image/wedding5.png';
import wedding6 from '../assets/image/wedding6.png';
import CreateCard from '../components/common/Card/CreateCard';
// import { useState } from 'react';

const DashBoardPage = () => {
  // const [cards, setCards] = useState<string[]>([]);

  return (
    <PageLayout title="우리, 결혼해요">
      {/* <div className="flex-center px-4 pb-3 border-b border-background opacity-40 text-background text-[10px] m-5 tracking-wider">
        우리만의 청첩장을 꾸미고 관리해보세요
      </div> */}
      <div className="grid grid-cols-2 gap-6 place-items-center pt-10 px-6 pb-10">
        <div>
          <CreateCard />
        </div>
        {/* 테스트 */}
        <Card image={wedding1} />
        <Card image={wedding2} />
        <Card image={wedding3} />
        <Card image={wedding4} />
        <Card image={wedding5} />
        <Card image={wedding6} />
        {/* {cards.map((card, index) => (
          <Card key={index} image={card} />
        ))} */}
      </div>
    </PageLayout>
  );
};

export default DashBoardPage;
