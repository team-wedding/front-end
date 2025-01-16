import { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import HeaderButton from '../components/common/Header/HeaderButton';
import { useLocation, useNavigate } from 'react-router';
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
import { useGetInvitation, useUpdateInvitation } from '../hooks/useInvitation';
;
import { resetAllStores } from '../store/resetStore';

import useBrideGroomStore from '../store/useBrideGroomStore';
import useGreetingStore from '../store/useGreetingStore';
import useThemeStore from '../store/useThemeStore';
import { useWeddingStore } from '../store/useWeddingStore';
import useContactStore from '../store/useContactStore';
import useAddressStore from '../store/useAddressStore';
import useImageStore from '../store/useImageStore';

const EditInvitationPage = () => {
  // const { title, setTitle } = useInvitationStore();
  const navigate = useNavigate();
  const path = useLocation().pathname.split('/')
  const handleCancel = () => navigate('/dashboard'); const { mutate: editInvitation } = useUpdateInvitation(parseInt(path[2]))
  const invitation = useGetInvitation(parseInt(path[2]))
  let isEdit = path[1] === 'edit'
  const { setAddress, setJibunAddress, setCoords } = useAddressStore();
  const { setWeddingDate, setWeddingTime } = useWeddingStore();
  const { setGreeting, setTitle, setSelectedSample } = useGreetingStore();
  const { setUploadedImage } = useImageStore();
  const contacts = useContactStore((state) => state.updateContact);
  const { updateBrideGroom, updateFamily } = useBrideGroomStore();
  const { setFont, setBackgroundColor, setWeight } = useThemeStore();


  useEffect(() => {
    if (invitation) {
      setAddress('주소', '짚코드');
      setJibunAddress('');
      setCoords(0, 0);
      setWeddingDate(new Date(invitation.date));
      setWeddingTime(invitation.weddingTime);
      setGreeting(invitation.content);
      setTitle(invitation.contentType);
      setSelectedSample('');
      setUploadedImage(invitation.imgUrl);

      contacts(0, 'fatherContact', invitation.brideFatherContact);
      contacts(0, 'motherContact', invitation.brideMotherContact);
      contacts(1, 'fatherContact', invitation.groomFatherContact);
      contacts(1, 'motherContact', invitation.groomMotherContact);
      contacts(0, 'contact', invitation.brideContact);
      contacts(1, 'contact', invitation.groomContact);

      updateBrideGroom(0, 'name', invitation.brideName);
      updateBrideGroom(1, 'name', invitation.groomName);

      updateFamily(0, 'father', 'name', invitation.brideFatherName);
      updateFamily(0, 'mother', 'name', invitation.brideMotherName);
      updateFamily(0, 'father', 'isDeceased', invitation.brideFatherAlive);
      updateFamily(0, 'mother', 'isDeceased', invitation.brideMotherAlive);
      updateFamily(1, 'father', 'name', invitation.groomFatherName);
      updateFamily(1, 'mother', 'name', invitation.groomMotherName);
      updateFamily(1, 'father', 'isDeceased', invitation.groomFatherAlive);
      updateFamily(1, 'mother', 'isDeceased', invitation.groomMotherAlive);

      setFont(invitation.font);
      setBackgroundColor(invitation.backgroundColor);
      setWeight(invitation.weight);
    }
  }, [invitation])

  // updateInvitaionStore(invitation ? invitation : getInvitationAction())

  const handleSave = async () => {
    if (isEdit) {
      await editInvitation()
      resetAllStores()
      navigate('/dashboard');
    }
  }


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
