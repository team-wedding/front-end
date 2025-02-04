import SectionTitle from '@/components/common/SectionTitle';
import useGreetingStore from '@store/useGreetingStore';

const Greeting = () => {
  const { greetingContent, greetingTitle } = useGreetingStore();

  const defaultTitle = greetingTitle || '소중한 분들을 초대합니다';
  const defaultGreeting =
    greetingContent ||
    `저희 두 사람의 작은 만남이\n사랑의 결실을 이루어\n소중한 결혼식을 올리게 되었습니다.\n\n평생 서로 귀하게 여기며\n첫 마음 그대로 존중하고 배려하며 살겠습니다.\n\n오로지 믿음과 사랑을 약속하는 날\n오셔서 축복해 주시면 더없는 기쁨으로\n간직하겠습니다.`;

  return (
    <div className="column-center gap-6">
      <SectionTitle subTitle="INVITATION" title={defaultTitle} />

      <div className="flex justify-center text-center whitespace-pre-wrap  leading-loose">
        {defaultGreeting}
      </div>
    </div>
  );
};

export default Greeting;
