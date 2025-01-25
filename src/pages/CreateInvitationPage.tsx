import { useEffect, useState } from 'react';
import PageLayout from '@layout/PageLayout';
import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate } from 'react-router';
import { Accordion } from '@common/CreateInvitation/Accordion';
import { Stepper } from '@common/CreateInvitation/Stepper';
import { StepNavigation } from '@common/CreateInvitation/StepNavigation';
import PreviewDisplay from '@display/PreviewDisplay';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAccordionStore } from '@store/useAccordionStore';
import { useCreateInvitation } from '@hooks/useInvitation';
import { resetAllStores } from '@store/resetStore';
const sliceRanges = [[0, 3], [3, 13], [13]];
const CreateInvitationPage = () => {
  const { items, initializeItems, moveItem } = useAccordionStore();
  const [steps, setSteps] = useState(1);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  useEffect(() => {
    const [start, end] = sliceRanges[steps - 1];
    initializeItems(start, end);
  }, [steps, initializeItems]);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/dashboard');
    resetAllStores();
  };
  const { mutate: createInvitation } = useCreateInvitation();

  const handleSave = async () => {
    await createInvitation();
    resetAllStores();
    navigate('/dashboard');
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleStepClick = (step: number) => {
    if (step > 0 && step <= sliceRanges.length) {
      setSteps(step);
    }
  };
  const handleNext = () => {
    if (steps < sliceRanges.length) {
      handleStepClick(steps + 1);
    }
  };
  const handlePrev = () => {
    if (steps > 1) {
      handleStepClick(steps - 1);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page-container">
        <div className="create-section">
          <PageLayout
            title="새로운 청첩장"
            leftButton={
              <HeaderButton
                onClick={handleCancel}
                className="text-sm text-gray-600 hover:text-black active:text-rose-400"
              >
                취소
              </HeaderButton>
            }
            rightButton={
              <HeaderButton
                onClick={handleSave}
                className="text-sm text-gray-600 hover:text-black active:text-rose-400"
              >
                저장
              </HeaderButton>
            }
            customFooter={
              <StepNavigation
                currentStep={steps}
                totalSteps={sliceRanges.length}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            }
          >
            <Stepper
              steps={['기본 정보 입력', '기능 선택', '테마 선택']}
              currentStep={steps}
              onStepClick={handleStepClick}
            />
            <div className="bg-background bg-opacity-10 min-h-screen  font-Pretendard">
              <Accordion
                items={items}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
                moveItem={moveItem}
              />
            </div>
          </PageLayout>
        </div>

        <div className="preview-section">
          {/* <ResultDisplay /> */}
          <PreviewDisplay />
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateInvitationPage;
