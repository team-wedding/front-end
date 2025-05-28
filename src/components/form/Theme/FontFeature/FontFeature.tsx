import InformationItem from '@/components/common/CreateInvitation/InformationItem';
import fonts from '@constants/fonts';
import useThemeStore from '@store/useThemeStore';

const FontFeature = () => {
  //bigSize, updateSize
  const { fontIndex, setFont } = useThemeStore();
  const handleFonts = (index: number) => {
    setFont(fonts[index].font, index);
  };
  // const handleSize = () => {
  //   updateSize(!bigSize);
  // };
  return (
    <div className="mx-4">
      <InformationItem messages={['원하는 글꼴을 선택해주세요']} />
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4 my-10">
        {fonts.map((value, index) => {
          return (
            <div
              key={index}
              className={`${value.font} flex flex-col justify-center items-center border py-5 rounded-md  hover:shadow-lg hover:border-black ${index == fontIndex && 'border-black'}`}
              onClick={() => handleFonts(index)}
            >
              <div className="text-xl ">Aa 가나다</div>
              <div className="text-xs text-gray-500">{value.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FontFeature;
