import React from "react";
import Banner from "../Banner/Banner";
import TopRatedMeals from "../TopRatedMeals/TopRatedMeals";

import WhyChooseUs from "../WhyChooseUS/WhyChooseUs";
import Testimonial from "../Testimonial/Testimonial";
import CTAAction from "../CTAAction/CTAAction";
import Brands from "../Brands/Brands";

const Home = () => {
  return (
    <div>
      <section className="mt-20">
        <Banner />
      </section>

      <section className="my-10">
        <h1 className="font-bold text-center mb-8 text-5xl text-orange-400">
          Collaborate With{" "}
        </h1>
        <Brands />
      </section>

      <section>
        <TopRatedMeals />
      </section>
      <section>
        <Testimonial />
      </section>
      <section>
        <WhyChooseUs />
      </section>
      <section>
        <CTAAction />
      </section>
    </div>
  );
};

export default Home;
