import CardHeader from './CardHeader';
import CardFooter from './CardFooter';
import logo from '@assets/logo2.png';

interface CardProps {
  image?: string;
  id: number;
  title: string;
}

const Card = ({ image, id, title }: CardProps) => {
  return (
    <div className="relative flex flex-col items-center border border-gray-200 rounded-lg shadow-xl w-[150px] h-[225px] bg-gray-200">
      <div className="relative h-full w-full rounded-lg overflow-hidden">
        <img
          src={image || logo}
          className="object-cover h-full w-[188px] rounded-lg"
        ></img>
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <CardHeader id={id} title={title} />
      </div>
      <CardFooter id={id} />
    </div>
  );
};

export default Card;
