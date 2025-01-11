import { useState } from 'react';
import useThemeStore from '../../../store/useThemeStore';

const ThemeSelection = () => {
  const fonts = ['pretendard', 'font-mono', 'font-serif'];
  const [font, setFont] = useState(fonts[0]);
  const weights = ['font-medium', 'font-semibold', 'font-bold'];
  const [weight, setWeight] = useState(weights[0]);
  const Colors = ['bg-pink-500', 'bg-cyan-500', 'bg-blue-500'];
  const [color, setColor] = useState(Colors[0]);

  const [fontDrop, setFontDrop] = useState(false);
  const [weightDrop, setWeightDrop] = useState(false);

  const handleFontDropDown = () => {
    setFontDrop(!fontDrop);
  };
  const handleWeightDropDown = () => {
    setWeightDrop(!weightDrop);
  };

  const theme = useThemeStore();

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex flex-col gap-6 h-36">
        <div className="flex flex-row items-center justify-between">
          <div className="font-medium text-xs">글꼴</div>
          <div className="flex  gap-2">
            <button
              className={`relative w-24 text-gray-700 border rounded-md text-xs py-2 text-center items-center ${font}  bg-white  ${fontDrop && 'rounded-b-none'}`}
              onClick={handleFontDropDown}
              onBlur={() => setFontDrop(false)}
            >
              {font}
              <div
                className={`absolute flex flex-col top-full w-full -left-[1px]  box-content rounded-b-md text-gray-800 bg-white  border ${fontDrop ? 'visible' : 'hidden'}`}
              >
                {fonts.map((value, index) => {
                  return (
                    <div
                      className={`${index !== 2 ? 'border-b' : 'rounded-b-md'} px-2 py-2  hover:bg-gray-200 ${value}`}
                      key={index}
                      onClick={() => {
                        return setFont(value), theme.updateFont(value);
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </button>
            <button
              className={`relative w-24 text-gray-700 border  rounded-md text-xs text-center  ${weight} ${weightDrop && 'rounded-b-none'}`}
              onClick={handleWeightDropDown}
              onBlur={() => setWeightDrop(false)}
            >
              {weight}
              <div
                className={`absolute flex flex-col top-full -left-[1px]  w-full box-content rounded-b-md text-gray-800 bg-white  border ${weightDrop ? 'visible' : 'hidden'} `}
              >
                {weights.map((value, index) => {
                  return (
                    <div
                      className={`${index !== 2 ? 'border-b' : 'rounded-b-md'}  px-1 py-2 hover:bg-gray-200 ${font} ${value}`}
                      key={index}
                      onClick={() => {
                        return setWeight(value), theme.updateWeight(weight);
                      }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </button>
          </div>
        </div>
        <div className="flex flex-row w-full items-center gap-8">
          <div className="text-xs font-medium">배경색상</div>
          <div className="flex flex-row gap-4">
            {Colors.map((value, index) => {
              return (
                <button
                  onClick={() => (
                    setColor(value), theme.updateBackgroundColor(value)
                  )}
                  key={index}
                  className={`size-6 ${value} rounded-full border ${color == value && `ring-offset-2 ring-1 ring-black/30`} `}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThemeSelection;
