interface ProductTitleProps {
  imageSrc: string | undefined;
}

const ProductHero = ({ imageSrc }: ProductTitleProps) => (
  <div className="w-full lg:w-2/3 h-[80vh] flex items-center justify-center">
    <img
      className="w-full lg:w-2/3 h-[80vh] flex items-center justify-center"
      alt={imageSrc}
      src={imageSrc}
    />
  </div>
);

export default ProductHero;
