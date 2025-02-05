import { useEffect, useState } from 'react';
import PageLayout from '@layout/PageLayout';
import HeaderButton from '@common/Header/HeaderButton';
import { useNavigate, useParams } from 'react-router';
import { Accordion } from '@common/CreateInvitation/Accordion';
import { Stepper } from '@common/CreateInvitation/Stepper';
import { StepNavigation } from '@common/CreateInvitation/StepNavigation';
import ResultDisplay from '@display/ResultDisplay';
import { useGetInvitation, useUpdateInvitation } from '@hooks/useInvitation';
import { getInvitationAction, useUpdateInvitationStore } from '../actions/invitationAction';
import { InvitationDetiail, NoticeDetail } from '../types/invitationType';
import { useAccordionStore } from '@/store/useAccordionStore';
import resetAllStores from '@/store/resetStore';
import { useInvitationStore } from '@/store/useInvitaionStore';
import { useS3Image } from '@/hooks/useS3Image';
import useImageStore from '@/store/useImageStore';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';
import useGalleryStore from '@/store/OptionalFeature/useGalleryFeatureStore';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const sliceRanges = [[0, 3], [3, 13], [13]];

const EditInvitationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { invitationtitle } = useInvitationStore()
  const { mutateAsync: editInvitation } = useUpdateInvitation(parseInt(id!));
  const { invitations } = useGetInvitation(parseInt(id!));
  // const { setOrderItems } = useAccordionStore()
  const { uploadedImageFile, uploadedImageUrl } = useImageStore()
  const { mutateAsync: s3Mutate } = useS3Image();
  const details = getInvitationAction();
  const { galleryFiles, grid } = useGalleryStore()
  const { notices } = useNoticeStore()
  const noticeImages = notices.flatMap((value) => {
    if (value.imgFile) {
      return value.imgFile
    } else return null
  })  // useMutation을 직접 변수에 할당
  const { optionalItems } = useAccordionStore();
  const findOrder = (feature: string) => {
    if (!feature) return undefined; // feature가 없으면 undefined 반환
    const result = optionalItems.find((value) => value.feature === feature);
    return result?.order;
  };
  const { selectedOptionalFeatures } = useOptionalFeatureStore();

  useUpdateInvitationStore(invitations as InvitationDetiail);

  // useEffect(() => {
  //   setOrderItems()
  // }, [])

  const { items, initializeItems, moveItem } = useAccordionStore();
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    const [start, end] = sliceRanges[steps - 1];
    initializeItems(start, end);
  }, [steps, initializeItems]);

  const handleSave = async () => {
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
      if (id) {
        await editInvitation({
          ...details,
          imgUrl: thumbnail.length > 0 ? thumbnail[0] : uploadedImageUrl,
          galleries: [{ images: gallery, grid, isActive: selectedOptionalFeatures.gallery },],
          notices: noticeList
        }
        );
      }
    } catch (err) {
      console.log(err)
      alert("수정중에 에러가 발생했습니다.")
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
    resetAllStores();
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
          <ResultDisplay />
        </div>
      </div>
    </DndProvider>
  );
};

export default EditInvitationPage;
