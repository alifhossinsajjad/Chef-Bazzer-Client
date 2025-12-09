import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedMeals from '../TopRatedMeals/TopRatedMeals';

import WhyChooseUs from '../WhyChooseUS/WhyChooseUs';
import Testimonial from '../Testimonial/Testimonial';
import CTAAction from '../CTAAction/CTAAction';


const Home = () => {
    return (
        <div>
            <section className='mt-20'>
                <Banner />
            </section>
            <section>
                <TopRatedMeals/>
            </section>
            <section>
                <Testimonial/>
            </section>
            <section>
                <WhyChooseUs/>
            </section>
            <section>
                <CTAAction/>
            </section>
        </div>
    );
};

export default Home;