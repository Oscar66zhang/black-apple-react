import React from "react";
import styles from "./Offer.module.css";

const Offer = ({ type, title, detail, image }) => {
  return (
    <div className={styles.container}>
      <img src={image} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.type}>{type}</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.detail}>{detail}</div>
      </div>
    </div>
  );
};

export default Offer;
