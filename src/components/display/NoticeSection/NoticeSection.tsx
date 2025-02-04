import { useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useOptionalFeatureStore } from '@/store/OptionalFeature/useOptionalFeatureStore';
import SectionTitle from '@/components/common/SectionTitle';
import useNoticeStore from '@/store/OptionalFeature/useNoticeFeatureStore';

const NoticeSection = () => {
  const { selectedOptionalFeatures } = useOptionalFeatureStore();
  const { notices } = useNoticeStore();

  const isNoticeFeatureActive = selectedOptionalFeatures.notice;

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: notices.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      // centerMode: true,
      // centerPadding: '10px',
    }),
    [notices.length],
  );

  return (
    isNoticeFeatureActive && (
      <div className="column-center h-full py-10 px-8">
        <SectionTitle subTitle="NOTICE" title="공지사항" />

        <div className="w-80 my-6">
          {notices.length > 0 ? (
            <Slider {...settings} className="pb-2">
              {notices.map((notice) => (
                <div
                  key={notice.noticeId}
                  className="rounded-lg py-10 px-8 mx-auto text-center bg-gray-50"
                >
                  {notice.image && (
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="w-full h-48 object-cover rounded-lg mb-6 shadow-md"
                    />
                  )}
                  <h3 className="p-4 text-sm font-medium overflow-auto">
                    {notice.title}
                  </h3>
                  <div className="overflow-auto whitespace-pre-wrap text-xs p-4 leading-6 font-light">
                    {notice.content}
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-400">
              등록된 공지사항이 없습니다.
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default NoticeSection;
