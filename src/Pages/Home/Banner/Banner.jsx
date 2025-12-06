import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Import images
import img1 from '../../../assets/banner/img1.jpg';
import img2 from '../../../assets/banner/img2.jpg';
import img3 from '../../../assets/banner/img3.jpg';
import img4 from '../../../assets/banner/img4.jpg';


const Banner = () => {
    return (
        <div className="w-full h-[200px] md:h-[300px] lg:h-[500px] relative">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                effect={'fade'}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper w-full h-full"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                        style={{ backgroundImage: `url(${img1})` }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 z-10"></div>

                        {/* Content */}
                        <div className="relative z-20 text-center text-white px-4">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                                Fresh Meals <span className="text-yellow-400">Delivered</span>
                            </h2>
                            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                                Discover the joy of home-cooked goodness without the hassle. Fresh ingredients, masterful chefs, delivered to your door.
                            </p>
                            <button className="btn btn-primary btn-lg text-white border-none bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full text-lg shadow-lg transform transition hover:scale-105">
                                Order Now
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                        style={{ backgroundImage: `url(${img2})` }}
                    >
                        <div className="absolute inset-0 bg-black/50 z-10"></div>
                        <div className="relative z-20 text-center text-white px-4">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                                Taste the <span className="text-yellow-400">Difference</span>
                            </h2>
                            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                                Experience culinary perfection with our curated menu of local and international delicacies.
                            </p>
                            <button className="btn btn-primary btn-lg text-white border-none bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full text-lg shadow-lg transform transition hover:scale-105">
                                View Menu
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                        style={{ backgroundImage: `url(${img3})` }}
                    >
                        <div className="absolute inset-0 bg-black/50 z-10"></div>
                        <div className="relative z-20 text-center text-white px-4">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                                Zero Waste <span className="text-yellow-400">Cooking</span>
                            </h2>
                            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                                We believe in sustainability. Enjoy eco-friendly packaging and responsibly sourced ingredients.
                            </p>
                            <button className="btn btn-primary btn-lg text-white border-none bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full text-lg shadow-lg transform transition hover:scale-105">
                                Learn More
                            </button>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide>
                    <div
                        className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                        style={{ backgroundImage: `url(${img4})` }}
                    >
                        <div className="absolute inset-0 bg-black/50 z-10"></div>
                        <div className="relative z-20 text-center text-white px-4">
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                                Chefs Special <span className="text-yellow-400">Everyday</span>
                            </h2>
                            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                                New surprises await you daily with our rotating chef's specials.
                            </p>
                            <button className="btn btn-primary btn-lg text-white border-none bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-full text-lg shadow-lg transform transition hover:scale-105">
                                Explore Specials
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;