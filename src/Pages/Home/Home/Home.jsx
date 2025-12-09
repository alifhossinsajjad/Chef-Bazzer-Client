import React from 'react';
import Banner from '../Banner/Banner';
import TopRatedMeals from '../TopRatedMeals/TopRatedMeals';
import CustomerReview from '../CutomerReview/CustomerReview';

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
                <CustomerReview/>
            </section>
        </div>
    );
};

export default Home;