import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import InvitationTitleInput from '../components/common/CreateInvitation/InvitationTitleInput';
import { useInvitationStore } from '../store/useInvitaionStore';
import { useNavigate } from 'react-router';
import { Accordion } from '../components/common/CreateInvitation/Accordion';
import { accordionData } from '../constants/accordionData';
// import { Stepper } from '../components/common/CreateInvitation/Stepper';
// import { StepNavigation } from '../components/common/CreateInvitation/StepNavigation';

const CreateInvitationPage1: React.FC = () => {
  const { title, setTitle } = useInvitationStore();
  const navigate = useNavigate()

  const handleCancel = () => navigate('/home');
  const handleSave = () => console.log('저장 버튼 클릭, 제목: ', title);

  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // const steps = ["기본 정보 입력", "기능 선택", "테마 선택"];

  // const [currentStep, setCurrentStep] = useState<number>(1);

  // const handleNext = () => {
  //   setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  // };

  // const handlePrev = () => {
  //   setCurrentStep((prev) => Math.max(prev - 1, 1));
  // };

  return (
    <PageLayout
      title="새로운 청첩장"
      leftButton={
        <HeaderButton
          onClick={handleCancel}
          className="hover:text-pink-400 active:text-pink-600"
        >
          취소
        </HeaderButton>
      }
      rightButton={
        <HeaderButton
          onClick={handleSave}
          className="hover:text-pink-400 active:text-pink-600"
        >
          저장
        </HeaderButton>
      }
    >
      <div>
        {/* 청첩장 제목 입력 */}
        <InvitationTitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <Stepper steps={steps} currentStep={currentStep} /> */}
        <Accordion items={accordionData.slice(0, 6)} expandedIds={expandedIds} toggleExpand={toggleExpand} />
        {/* <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          onPrev={handlePrev}
          onNext={handleNext}
        /> */}
      </div>
    </PageLayout>
  );
};

export default CreateInvitationPage1;
