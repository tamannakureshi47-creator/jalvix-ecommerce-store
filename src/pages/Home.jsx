import React from "react";
import Category from "../components/Category";
import MideBanner from "../components/MideBanner";
import Features from "../components/Features";
import CarouselUI from "../components/CarouselUI";

const Home = () => {
  return (
    <main className="storefront-home">
      <CarouselUI />
      <Category />
      <MideBanner />
      <Features />
    </main>
  );
};

export default Home;