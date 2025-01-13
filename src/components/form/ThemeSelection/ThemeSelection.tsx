
import useThemeStore from '../../../store/useThemeStore';
import fonts from '../../../constants/fonts'

const ThemeSelection = () => {
  const theme = useThemeStore();
  const handleFonts = (index: number) => {
    theme.updateFont(fonts[index].font)
  }
  const FontContainer = ({ font, name, index }: { font: string, name: string, index: number }) => {
    return (
      <div className={`font-${font} flex flex-col justify-center items-center border py-5 rounded-md  hover:shadow-lg hover:border-black`}
        onClick={() => handleFonts(index)}>
        <div className="text-xl ">Aa 가나다</div>
        <div className="text-xs text-gray-500">{name}</div>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {fonts.map((value, index) => {
        return <FontContainer key={index} font={value.font} name={value.name} index={index} />
      })}
    </div>
  );
};
export default ThemeSelection;
