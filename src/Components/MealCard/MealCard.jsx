import React from "react";

const MealCard = ({ meal }) => {
  const { ChefName, FoodImage, Price, Rating, DeliveryArea, ChefId } = meal;

  return (
    <div className="group relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
      {/* Background Image Area */}
      <div className="absolute inset-0 h-full w-full">
        <img
          src={FoodImage}
          alt={ChefName}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      </div>

      {/* Floating Price Tag */}
      <div className="absolute top-5 right-5 z-10">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          ${Price}
        </div>
      </div>

      {/* Content Content - Positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        {/* Chef & Rating Header */}
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg group-hover:text-amber-400 transition-colors duration-300">
            {ChefName}
          </h2>
          <div className="flex items-center gap-1 bg-amber-500/90 text-white px-2 py-1 rounded-md text-sm font-bold shadow-sm">
            ⭐ {Rating}
          </div>
        </div>

        {/* Hidden Details that Reveal on Hover */}
        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">Delivers To:</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {DeliveryArea?.slice(0, 3).map((area, index) => (
                <span key={index} className="px-2 py-0.5 bg-white/10 border border-white/10 text-gray-200 text-xs rounded-full">
                  {area}
                </span>
              ))}
            </div>

            <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
              View Menu
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Always visible hint if not hovering (optional, but good UX) */}
        <div className="group-hover:hidden mt-2">
          <p className="text-gray-400 text-sm italic">Hover to see details...</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;