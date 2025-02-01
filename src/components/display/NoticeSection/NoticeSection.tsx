import { useMemo } from 'react';
import useNoticeStore from '@store/useNoticeStore';
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
      // centerMode: true,
      // centerPadding: '10px',
    }),
    [notices.length],
  );

  return (
    <div className="column-center w-96 h-full py-10 px-6 ">
      <div className="sub-title">NOTICE</div>
      <div className="title">공지사항</div>
      <div className="w-11/12 my-6">
        {notices.length > 0 ? (
          <Slider {...settings} className="pb-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="border-2 rounded-lg shadow-sm bg-white p-8 w-[90%] mx-auto text-center"
              >
                {notice.image && (
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className="w-full object-cover h-52 rounded-md mb-6"
                  />
                )}
                <h3 className="p-4 font-semibold">{notice.title}</h3>
                <div className="overflow-auto whitespace-pre-wrap text-sm p-4">
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
