import React from 'react';

const WhyChooseUs = () => {
    return (
        <div>
            <div className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
      Why Choose LocalChefBazaar
    </h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        { icon: "🍳", title: "Home-Cooked Freshness", desc: "Every meal cooked fresh, just like homemade" },
        { icon: "👩‍🍳", title: "Local Chefs", desc: "Support talented cooks in your community" },
        { icon: "🚚", title: "Fast Delivery", desc: "Hot meals delivered to your door" }
      ].map((item) => (
        <div key={item.title} className="bg-orange-50 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>
        </div>
    );
};

export default WhyChooseUs;