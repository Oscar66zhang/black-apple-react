import styles from "./Offer.module.css";

export interface OfferProps {
  type: string;
  title: string;
  detail: string;
  image: string;
}

const Offer = ({ type, title, detail, image }: OfferProps) => {
  // const handleClick:React.MouseEventHandler<HTMLDivElement>= (e) => {
  //   console.log("Offer clicked");
  // };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Offer clicked");
  };

  return (
    <div className={styles.container} onClick={handleClick} data-title={title}>
      <img src={image} className={styles.image} alt={title} />
      <div className={styles.content}>
        <div className={styles.type}>{type}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.detail}>{detail}</div>
      </div>
    </div>
  );
};

export default Offer;
