import { NEW_ARRIVALS_LIST, OFFER_LIST } from "../assets/data";
import ProductList from "@/components/ProductList";
import NewArrival from "@/components/NewArrival";
import Offer from "@/components/Offer";
import withSoldOut from "@/HOCS/withSoldOut";
import withBanner from "@/HOCS/withBanner";
import ImageHero from "@/components/ImageHero";
import { SUGGESTED_PROUDCT } from "../assets/data";
import ProductHero from "@/components/ProductHero";

const NewArrivalWithSoldOutCheck = withSoldOut((props) => {
  const { title } = props;
  return <NewArrival {...props} title={"商品:" + title} />;
});

const NewArrivalWithBannerAndSoldOutCheck = withBanner(
  NewArrivalWithSoldOutCheck,
  "手慢无!",
); //使用HOC添加Banner

const OfferWithSoldOutCheck = withSoldOut(Offer);

function Home() {
  return (
    <div>
      <ImageHero />
      <ProductHero product={SUGGESTED_PROUDCT.product} imageUrl={SUGGESTED_PROUDCT.imageSrc} />
      <ProductList title={"上新品，各个添新意"} datalength={NEW_ARRIVALS_LIST}>
        {NEW_ARRIVALS_LIST.map((item) => (
          <NewArrivalWithBannerAndSoldOutCheck key={item.title} {...item} scale={1.05} />
        ))}
      </ProductList>

      <ProductList
        title={"限时折扣，买到就是赚到"}
        datalength={OFFER_LIST.length}
      >
        {OFFER_LIST.map((item) => (
          <OfferWithSoldOutCheck key={item.title} {...item} />
        ))}
      </ProductList>
    </div>
  );
}

export default Home;
