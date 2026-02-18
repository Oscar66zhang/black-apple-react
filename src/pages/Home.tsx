import { NEW_ARRIVALS_LIST, OFFER_LIST } from "../assets/data";
import ProductList from "@/components/ProductList";
import NewArrival from "@/components/NewArrival";
import Offer from "@/components/Offer";
import withSoldOut from "@/HOCS/withSoldOut";
import withBanner from "@/HOCS/withBanner";
import ImageHero from "@/components/ImageHero";
import { SUGGESTED_PROUDCT } from "../assets/data";
import ProductHero from "@/components/ProductHero";
import type { NewArrivalProps } from "@/components/NewArrival";
import { useTranslation } from "react-i18next";

const NewArrivalWithSoldOutCheck = withSoldOut((props: NewArrivalProps) => {
  const { title } = props;
  return <NewArrival {...props} title={"商品:" + title} />;
});

const NewArrivalWithBannerAndSoldOutCheck = withBanner(
  NewArrivalWithSoldOutCheck,
  "手慢无!",
); //使用HOC添加Banner

const OfferWithSoldOutCheck = withSoldOut(Offer);

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <ImageHero />
      <ProductHero
        product={SUGGESTED_PROUDCT.product}
        imageUrl={SUGGESTED_PROUDCT.imageSrc}
      />
      <ProductList
        title={t(`home_page.newarrivals`)}
        datalength={NEW_ARRIVALS_LIST.length}
      >
        {NEW_ARRIVALS_LIST.map((item) => (
          <NewArrivalWithBannerAndSoldOutCheck
            key={item.title}
            {...item}
            scale={1.05}
          />
        ))}
      </ProductList>

      <ProductList title={t(`home_page.offers`)} datalength={OFFER_LIST.length}>
        {OFFER_LIST.map((item) => (
          <OfferWithSoldOutCheck key={item.title} {...item} />
        ))}
      </ProductList>
    </div>
  );
}

export default Home;
