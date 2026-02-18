import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div>
      <span>{t("footer.copyright")}</span>
    </div>
  );
};

export default Footer;
