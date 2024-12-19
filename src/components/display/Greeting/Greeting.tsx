import React from 'react';
import useGreetingStore from '../../../store/useGreetingStore';

const Greeting = () => {
  const { title, greeting } = useGreetingStore();
  const defaultTitle = title || '소중한 분들을 초대합니다';
  const defaultGreeting =
    greeting ||
    '저희 두 사람의 작은 만남이 사랑의 결실을 이루어 소중한 결혼식을 올리게 되었습니다. 평생 서로 귀하게 여기며 첫 마음 그대로 존중하고 배려하며 살겠습니다. 오로지 믿음과 사랑을 약속하는 날 오셔서 축복해 주시면 더없는 기쁨으로 간직하겠습니다.';

  return (
    <div className="column-center place-self-center w-3/4">
      <div className="title column-center place-self-center whitespace-pre-wrap mb-8">
        <div className="sub-title column-center place-self-center mb-2">
          INVITATION
        </div>
        {defaultTitle}
      </div>
      <div className="flex justify-center text-center whitespace-pre-wrap text-base font-normal leading-loose">
        {defaultGreeting}
      </div>
    </div>
  );
};

export default Greeting;
