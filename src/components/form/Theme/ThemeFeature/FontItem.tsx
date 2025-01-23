import fonts from "../../../constants/fonts";
import useThemeStore from "../../../store/useThemeStore";


export const FontItem = ({ font, name, index, }: { font: string, name: string, index: number }) => {
  const theme = useThemeStore();
  const handleFonts = (index: number) => {
    theme.updateFont(fonts[index].font)
  }
  return (
    <div className={`font-${font} flex flex-col justify-center items-center border py-5 rounded-md  hover:shadow-lg hover:border-black ${theme.font === fonts[index].font && 'shadow-lg border-black '}`}
      onClick={() => handleFonts(index)}>
      <div className="text-xl ">Aa 가나다</div>
      <div className="text-xs text-gray-500">{name}</div>
    </div>
  )
}