import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
const Testimonial = () => {
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("reviews");
      console.log(res.data);
      return res.data
    },
  });

  return (
   <div className="xl:lg:md:max-w-7xl mx-auto justify-center items-center">
     <div >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 20,
          stretch: "50",
          depth: 100,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        
          {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <TestimonialCard review={review}></TestimonialCard>
          </SwiperSlide>
        ))}
      
      </Swiper>
    </div>
   </div>
  );
};

export default Testimonial;
