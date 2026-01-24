import styles from "./Product.module.css";
import styled from "styled-components";

const StyledProductTextContainer = styled.div`
  position: absolute;
  top: 1.5rem;
  padding-left: 1.5rem;
  padding-top: 2rem;
  color: ${(props) => props.$textColor || "white"};
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const StyledProductContainer = styled.div`
  max-width: 28rem;
  position: relative;
  transition: transform ${(props) => props.$transition || "0.1s"} ease-in-out;

  &:hover {
    transform: scale(${(props) => props.$scale || 1});
    cursor: pointer;
  }
`;

const NewArrival= ({
  image,
  title,
  detail,
  textColor,
  scale = 1.05,
  onProductClick,
}) => {
  const imgStyle = {
    height: "auto",
    width: "100%",
    borderRadius: "0.5rem",
  };
  return (
    <StyledProductContainer
      $scale={scale}
      $transition="0.5s"
      onClick={() => onProductClick(title)}
    >
      <img style={imgStyle} src={image} alt="iPad Pro" />
      <StyledProductTextContainer $textColor={textColor}>
        <div className={styles["product-title"]}>{title}</div>
        <div className={styles["product-detail"]}>{detail}</div>
      </StyledProductTextContainer>
    </StyledProductContainer>
  );
};

export default NewArrival;
