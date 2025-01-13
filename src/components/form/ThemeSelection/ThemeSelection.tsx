
import useThemeStore from '../../../store/useThemeStore';
import fonts from '../../../constants/fonts'
import { useState } from 'react';

const ThemeSelection = () => {
  const theme = useThemeStore();
  const handleFonts = (index: number) => {
    theme.updateFont(fonts[index].font)
  }
  const [bigger, setBigger] = useState(false)
  const FontContainer = ({ font, name, index, }: { font: string, name: string, index: number }) => {
    return (
      <div className={`font-${font} flex flex-col justify-center items-center border py-5 rounded-md  hover:shadow-lg hover:border-black ${theme.font === fonts[index].font && 'shadow-lg border-black '}`}
        onClick={() => handleFonts(index)}>
        <div className="text-xl ">Aa 가나다</div>
        <div className="text-xs text-gray-500">{name}</div>
      </div>
    )
  }

  const handleSize = () => {
    setBigger((prev) => !prev)
  }
  return (
    <>
      <div className='flex flex-col gap-4 '>
        글자 크기
        <div className='flex flex-row justify-between w-full gap-4'>
          <button className={`border  rounded-md py-4  w-1/2 hover:shadow-lg hover:bg-pink-300 hover:text-white ${!bigger && ' shadow-md bg-pink-300 text-white'}`} onClick={handleSize}>보통사이즈</button>
          <button className={`border  rounded-md py-4  w-1/2 hover:shadow-lg hover:bg-pink-300 hover:text-white  ${bigger && '  shadow-md bg-pink-300 text-white'}`} onClick={handleSize}>어르신 사이즈</button>
        </div>
      </div>
      <div className="grid grid-cols-2 mt-4 gap-4">
        <div className='col-span-2'>글꼴</div>
        {fonts.map((value, index) => {
          return <FontContainer key={index} font={value.font} name={value.name} index={index} />
        })}
      </div>
    </>
  );
};
export default ThemeSelection;
