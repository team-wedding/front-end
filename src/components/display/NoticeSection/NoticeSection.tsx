import { useMemo } from 'react';
import useNoticeStore from '../../../store/useNoticeStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NoticeSection = () => {
  const { notices } = useNoticeStore();

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: notices.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    }),
    [notices.length],
  );

  return (
    <div className="column-center w-full h-full p-4">
      <div className="sub-title">NOTICE</div>
      <div className="title">공지사항</div>
      <div className="w-11/12 h-full">
        {notices.length > 0 ? (
          <Slider {...settings}>
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="border rounded-lg shadow-sm bg-white p-8"
              >
                {notice.image && (
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className="w-full object-cover h-48 rounded-md"
                  />
                )}
                <h3 className="text-center title text-base my-4">
                  {notice.title}
                </h3>
                <div className="text-center whitespace-pre-wrap text-xs font-light">
                  {notice.content}
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center font-light text-gray-500">
            등록된 공지사항이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default NoticeSection;
