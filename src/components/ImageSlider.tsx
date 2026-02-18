import { Feature } from "../types/custom";

const ImageSliderCard: React.FC<Feature> = ({
  title,
  detail,
  image,
  textColor,
}) => (
  <div className="flex-none rounded-lg shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer relative">
    <img
      src={image}
      alt={title}
      className="w-full h-[780px] rounded-lg object-cover"
    />
    <div
      className={`absolute left-8 top-8 z-10 ${
        textColor === "white" ? "text-white" : "text-black"
      }`}
    >
      <p className="font-semibold text-lg">{detail}</p>
      <p className="mt-1 font-semibold text-2xl w-52 break-words">{title}</p>
    </div>
  </div>
);

type ImageSliderProps = {
  features: Feature[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ features }) => {
  return (
    <>
      <h2 className="pt-10 pl-4 text-3xl md:text-6xl font-extrabold">
        了解一下
      </h2>
      <div className="pt-5 px-4 md:px-14 pb-10 flex gap-x-5 overflow-x-auto no-scrollbar">
        {features.map((f) => (
          <ImageSliderCard
            key={f.id}
            id={f.id}
            title={f.title}
            detail={f.detail}
            image={f.image}
            textColor={f.textColor}
          />
        ))}
      </div>
    </>
  );
};

export default ImageSlider;
