import fonts from "@constants/fonts";
import useThemeStore from "@store/useThemeStore";


const FontFeature = () => {
  const { fontIndex, setFont, bigSize, updateSize } = useThemeStore();
  const handleFonts = (index: number) => {
    setFont(fonts[index].font, index)
  }
  const handleSize = () => {
    updateSize(!bigSize)
  }
  return (
    <div>
      <div className='flex flex-col gap-4 mb-4'>
        글자 크기
        <div className='flex flex-row justify-between w-full gap-4'>
          <button className={`border  rounded-md py-4  w-1/2 hover:shadow-lg hover:bg-pink-300 hover:text-white ${!bigSize && ' shadow-md bg-pink-300 text-white'}`} onClick={handleSize}>보통사이즈</button>
          <button className={`border  rounded-md py-4  w-1/2 hover:shadow-lg hover:bg-pink-300 hover:text-white  ${bigSize && '  shadow-md bg-pink-300 text-white'}`} onClick={handleSize}>어르신 사이즈</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fonts.map((value, index) => {
          return (
            <div key={index} className={`font-${value.font} flex flex-col justify-center items-center border py-5 rounded-md  hover:shadow-lg hover:border-black ${index == fontIndex && 'border-black'}`}
              onClick={() => handleFonts(index)}>
              <div className="text-xl ">Aa 가나다</div>
              <div className="text-xs text-gray-500">{value.name}</div>
            </div>
          )
        })}
      </div>
    </div>

  );
};
export default FontFeature