import React from 'react';
import { FaUsers, FaUtensils, FaHeart, FaShippingFast, FaLeaf, } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">About ChefCorner</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Connecting food lovers with passionate home cooks in your community
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Story</h2>
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <p className="text-lg text-gray-600 mb-6">
                                ChefCorner was born from a simple idea: everyone deserves access to delicious, 
                                home-cooked meals, and talented home cooks deserve recognition for their culinary skills.
                            </p>
                            <p className="text-lg text-gray-600 mb-6">
                                Founded in 2023, we noticed that many incredible home chefs were sharing their culinary 
                                creations with friends and family but lacked a platform to reach a wider audience. 
                                At the same time, busy individuals craved authentic homemade meals but didn't have 
                                the time or skill to cook them.
                            </p>
                            <p className="text-lg text-gray-600">
                                Today, we're proud to be the bridge connecting food lovers with passionate home cooks, 
                                creating a community that celebrates homemade food and supports local culinary talent.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Mission</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="bg-orange-50 rounded-xl p-8 border-l-4 border-orange-500">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-orange-100 rounded-lg mr-4">
                                    <FaUsers className="text-orange-600 text-2xl" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800">For Home Cooks</h3>
                            </div>
                            <p className="text-gray-600">
                                To empower talented home cooks by providing them with a platform to showcase their skills, 
                                earn income from their passion, and grow their culinary businesses without the overhead 
                                costs of a traditional restaurant.
                            </p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-8 border-l-4 border-orange-500">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-orange-100 rounded-lg mr-4">
                                    <FaUtensils className="text-orange-600 text-2xl" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-800">For Food Lovers</h3>
                            </div>
                            <p className="text-gray-600">
                                To provide easy access to diverse, high-quality homemade meals prepared with love and care, 
                                supporting healthier eating habits and bringing communities together through shared food experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="text-center p-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaHeart className="text-orange-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">Quality & Freshness</h3>
                            <p className="text-gray-600">
                                Every meal is prepared fresh with high-quality ingredients, just like you'd make at home.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaUsers className="text-orange-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">Community Focus</h3>
                            <p className="text-gray-600">
                                Building connections within local communities and supporting neighborhood culinary talent.
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaLeaf className="text-orange-600 text-3xl" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">Sustainability</h3>
                            <p className="text-gray-600">
                                Reducing food waste by cooking to order and using local ingredients whenever possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
                    <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                1
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Browse Meals</h3>
                            <p className="text-gray-600 text-sm">
                                Explore daily menus from local chefs in your area
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                2
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Place Order</h3>
                            <p className="text-gray-600 text-sm">
                                Select your favorite meals and place your order
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                3
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Cook Prepares</h3>
                            <p className="text-gray-600 text-sm">
                                Chef prepares your meal fresh with quality ingredients
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                                4
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Enjoy Meal</h3>
                            <p className="text-gray-600 text-sm">
                                Receive delivery and enjoy delicious homemade food
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl font-bold text-orange-600">SR</span>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Sarah Rahman</h3>
                                <p className="text-orange-500 text-center mb-4">Founder & CEO</p>
                                <p className="text-gray-600 text-center text-sm">
                                    Former restaurant owner turned tech entrepreneur with a passion for food innovation
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl font-bold text-orange-600">AK</span>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Aminul Khan</h3>
                                <p className="text-orange-500 text-center mb-4">Head of Operations</p>
                                <p className="text-gray-600 text-center text-sm">
                                    10+ years in food industry management and quality control
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-3xl font-bold text-orange-600">NA</span>
                                </div>
                                <h3 className="text-xl font-semibold text-center mb-2 text-gray-800">Nadia Ahmed</h3>
                                <p className="text-orange-500 text-center mb-4">Community Manager</p>
                                <p className="text-gray-600 text-center text-sm">
                                    Building connections between chefs and food lovers across communities
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-orange-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Join Our Community</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Whether you're a home cook looking to share your culinary creations or a food lover 
                        seeking authentic homemade meals, LocalChefBazaar is here for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        
                        <Link
                            to={'/meals'}
                            className="px-8 py-3 bg-white text-orange-500 font-semibold rounded-lg border-2 border-orange-500 hover:bg-orange-50 transition duration-300"
                        >
                            Browse Meals
                        </Link>
                    </div>
                </div>
            </section>

          
        </div>
    );
};

export default About;