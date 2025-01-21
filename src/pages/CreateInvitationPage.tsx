import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import { useNavigate } from 'react-router';
import {
  Accordion,
  AccordionItemData,
} from '../components/common/CreateInvitation/Accordion';
import { accordionData } from '../constants/accordionData';
import { Stepper } from '../components/common/CreateInvitation/Stepper';
import { StepNavigation } from '../components/common/CreateInvitation/StepNavigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ResultDisplay from '../components/display/ResultDisplay';
import { useCreateInvitation } from '../hooks/useInvitation';

import { resetAllStores } from '../store/resetStore';
import { useInvitationStore } from '../store/useInvitaionStore';


const CreateInvitationPage = () => {
  const { title } = useInvitationStore();
  const navigate = useNavigate();


  const handleCancel = () => {
    navigate('/dashboard');
    resetAllStores();
  }
  const { mutate: createInvitation } = useCreateInvitation()

  const handleSave = async () => {
    await createInvitation()
    resetAllStores()
    navigate('/dashboard');
  }

  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [steps, setSteps] = useState(1);

  let sliceRanges = [[0, 3], [3, 13], [13]];
  const [items, setItems] = useState<AccordionItemData[]>(
    accordionData.slice(sliceRanges[0][0], sliceRanges[0][1]),
  );

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setItems(updatedItems);
  };

  const handleStepClick = (step: number) => {
    if (step > 0 && step <= sliceRanges.length) {
      setSteps(step);
      const [start, end] = sliceRanges[step - 1];
      setItems(accordionData.slice(start, end));
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
    <div className="page-container">
      <div className="create-section">
        <PageLayout
          title={title}
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
            <DndProvider backend={HTML5Backend}>
              <Accordion
                items={items}
                expandedIds={expandedIds}
                toggleExpand={toggleExpand}
                moveItem={moveItem}
              />
            </DndProvider>
          </div>
        </PageLayout>
      </div>

      <div className="preview-section">
        <ResultDisplay />
        {/* <ResultPage /> */}
      </div>
    </div>
  );
};

export default CreateInvitationPage;
