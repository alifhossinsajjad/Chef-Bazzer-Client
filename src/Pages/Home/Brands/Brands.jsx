import React from 'react';

import "swiper/css";
import "swiper/css/autoplay";
import burguer from '../../../assets/Brands/burger.jpg'
import bolets from '../../../assets/Brands/bolets.jpg'
import chilli from '../../../assets/Brands/chilli.jpg'
import kfc from '../../../assets/Brands/hfc.jpg'
import macdonal from '../../../assets/Brands/macdonal.jpg'
import oreo from '../../../assets/Brands/oreo.jpg'
import pizza from '../../../assets/Brands/pizza.jpg'
import pollo from '../../../assets/Brands/pollo.jpg'
import pringles from '../../../assets/Brands/pringles.jpg'
import { SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, } from "swiper/react";


const Brands = () => {

const brandsLogo = [
    burguer,
    bolets,
    chilli,
    kfc,
    macdonal,
    oreo,
    pizza,
    pollo,
    pringles
  ];


    return (
        <div>
              <Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={60}
      loop={true}
      speed={7000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      allowTouchMove={false}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {brandsLogo.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}

     
    </Swiper>
  
        </div>
    );
};

export default Brands;