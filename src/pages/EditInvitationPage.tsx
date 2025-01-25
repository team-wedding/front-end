import { useState } from 'react';
import PageLayout from '@layout/PageLayout';
import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate, useParams } from 'react-router';
import { Accordion } from '@common/CreateInvitation/Accordion';
import { AccordionItemData } from '@constants/accordionData';
import { accordionData } from '@constants/accordionData';
import { Stepper } from '@common/CreateInvitation/Stepper';
import { StepNavigation } from '@common/CreateInvitation/StepNavigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ResultDisplay from '@display/ResultDisplay';
import { useGetInvitation, useUpdateInvitation } from '@hooks/useInvitation';
import { useUpdateInvitationStore } from '../actions/invitationAction';
import { InvitationDetiail } from '../types/invitationType';

const EditInvitationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleCancel = () => navigate('/dashboard');
  const { mutate: editInvitation } = useUpdateInvitation(parseInt(id!));
  const { invitations } = useGetInvitation(parseInt(id!));

  useUpdateInvitationStore(invitations as InvitationDetiail);

  const handleSave = async () => {
    if (id) {
      await editInvitation();
      navigate('/dashboard');
    }
  };

  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [steps, setSteps] = useState(1);

  let sliceRanges = [[0, 3], [3, 14], [14]];
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

export default EditInvitationPage;
