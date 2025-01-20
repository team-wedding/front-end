import CardHeader from './CardHeader';
import CardFooter from './CardFooter';

interface CardProps {
  image?: string;
}

const Card = ({ image }: CardProps) => {
  return (
    <div className="relative flex flex-col items-center border border-gray-200 rounded-lg shadow-xl w-[150px] h-[225px] bg-gray-200">
      <div className="relative h-full w-full rounded-lg overflow-hidden">
        <img
          src={image}
          className="object-cover h-full w-[188px] rounded-lg"
        ></img>
        <div className="absolute inset-0 bg-white opacity-10"></div>
        <CardHeader />
      </div>

      <CardFooter />
    </div>
  );
};

export default Card;
