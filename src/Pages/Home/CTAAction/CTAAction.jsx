import React from 'react';
import { Link } from 'react-router';

const CTAAction = () => {
    return (
        <div>
            <div className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-6">Join Our Community Today</h2>
    <p className="text-xl mb-8 max-w-3xl mx-auto">
      Whether you're a food lover or a home cook, we have something for everyone
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to={'/meals'} className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition">
        Browse Meals 🍽️
      </Link>
     
    </div>
  </div>
</div>
        </div>
    );
};

export default CTAAction;