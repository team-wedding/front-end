
import fonts from '../../../constants/fonts'
import { useState } from 'react';
import { FontItem } from './FontItem';

const ThemeSelection = () => {

  const [bigger, setBigger] = useState(false)

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
          return <FontItem key={index} font={value.font} name={value.name} index={index} />
        })}
      </div>
    </>
  );
};
export default ThemeSelection;
