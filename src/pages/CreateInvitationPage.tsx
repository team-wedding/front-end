import { useEffect, useState } from 'react';
import PageLayout from '@layout/PageLayout';
import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate } from 'react-router';
import { Accordion } from '@common/CreateInvitation/Accordion';
import { Stepper } from '@common/CreateInvitation/Stepper';
import { StepNavigation } from '@common/CreateInvitation/StepNavigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAccordionStore } from '@store/useAccordionStore';
import { usePostInvitation } from '@hooks/useInvitation';
import { useInvitationStore } from '@/store/useInvitaionStore';
import resetAllStores from '@/store/resetStore';
import useBrideGroomStore from '@/store/useBrideGroomStore';
import { validateBrideGroomNames } from '@/utils/validator';
import NameInputModal from '@/components/form/BasicInformation/NameInput/NameInputModal';
import ResultDisplay from '@/components/display/ResultDisplay';

import useImageStore from '@/store/useImageStore';
import { useS3Image } from '@/hooks/useS3Image';
import { getInvitationAction } from '@/actions/invitationAction';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';
import { NoticeDetail } from '@/types/invitationType';

const sliceRanges = [[0, 3], [3, 13], [13]];

const CreateInvitationPage = () => {
  const { items, initializeItems, moveItem } = useAccordionStore();
  const [steps, setSteps] = useState(1);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { brideGroom } = useBrideGroomStore();
  const { invitationtitle } = useInvitationStore()
  useEffect(() => {
    const [start, end] = sliceRanges[steps - 1];
    initializeItems(start, end);
  }, [steps, initializeItems]);

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/dashboard');
    resetAllStores();
  };
  const { uploadedImageFile } = useImageStore()
  const { galleryFiles, grid } = useGalleryStore()
  const { notices } = useNoticeStore()
  const noticeImages = notices.flatMap((value) => {
    if (value.imgFile) {
      return value.imgFile
    } else return null
  })
  const { mutateAsync: postMutate } = usePostInvitation();  // useMutation을 직접 변수에 할당
  const { mutateAsync: s3Mutate } = useS3Image();
  const details = getInvitationAction();
  const { optionalItems } = useAccordionStore();
  const findOrder = (feature: string) => {
    if (!feature) return undefined; // feature가 없으면 undefined 반환
    const result = optionalItems.find((value) => value.feature === feature);
    return result?.order;
  };
  const { selectedOptionalFeatures } = useOptionalFeatureStore();


  const handleSave = async () => {
    if (!validateBrideGroomNames(brideGroom)) {
      setIsModalOpen(true);
      return;
    }
    try {
      const { imageUrls: thumbnail } = await s3Mutate(uploadedImageFile ? [uploadedImageFile!] : []);
      const { imageUrls: gallery } = await s3Mutate(galleryFiles.length && galleryFiles.length > 0 ? galleryFiles : [])
      const { imageUrls: noticeImg1 } = await s3Mutate(noticeImages[0] ? [noticeImages[0]] : []);
      const { imageUrls: noticeImg2 } = await s3Mutate(noticeImages[1] ? [noticeImages[1]] : []);
      const { imageUrls: noticeImg3 } = await s3Mutate(noticeImages[2] ? [noticeImages[2]] : []);
      const { imageUrls: noticeImg4 } = await s3Mutate(noticeImages[3] ? [noticeImages[3]] : []);
      const { imageUrls: noticeImg5 } = await s3Mutate(noticeImages[4] ? [noticeImages[4]] : []);
      const noticeS3ImageList = [noticeImg1, noticeImg2, noticeImg3, noticeImg4, noticeImg5]

      const noticeList: NoticeDetail[] = await notices.map((value, index) => {
        return {
          ...value,
          order: findOrder('notice'),
          isActive: selectedOptionalFeatures.notice,
          image: noticeS3ImageList[index][0]
        };
      });
      await postMutate({
        ...details,
        imgUrl: thumbnail.length > 0 ? thumbnail[0] : "",
        galleries: [{ images: gallery, grid, isActive: selectedOptionalFeatures.gallery },],
        notices: noticeList
      }
      );
    } catch (err) {
      console.log(err)
      alert("생성중에 에러가 발생했습니다.")
    }
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
      <div className="page-container relative">
        <div className="create-section">
          <PageLayout
            title={invitationtitle}
            leftButton={
              <HeaderButton
                onClick={handleCancel}
                className="text-sm text-gray-600 mx-6 hover:text-black active:text-rose-400"
              >
                취소
              </HeaderButton>
            }
            rightButton={
              <HeaderButton
                onClick={handleSave}
                className="text-sm text-gray-600 mx-6 hover:text-black active:text-rose-400"
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
            <div className="bg-background bg-opacity-10 min-h-screen font-Pretendard">
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
          <ResultDisplay />
        </div>
      </div>
      <NameInputModal
        isOpen={isModalOpen}
        onConfirm={() => setIsModalOpen(false)}
      />
    </DndProvider>
  );
};

export default CreateInvitationPage;

