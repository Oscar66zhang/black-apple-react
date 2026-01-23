import styles from "./withSoldOut.module.css";
const withSoldOut = (WrappedComponent) => {
  return ({ soldOut, ...props }) => {
    return soldOut ? (
      <div className={styles.grayOverlay}>
        <WrappedComponent {...props} />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
};

export default withSoldOut;
