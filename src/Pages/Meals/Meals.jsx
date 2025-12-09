import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading/Loading";
import MealCard from "../../Components/MealCard/MealCard";

const Meals = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(""); 
  const [debouncedSearch, setDebouncedSearch] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;


 useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); 
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const {
    data: data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", debouncedSearch, currentPage], 
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/meals?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearch}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const { meals = [], totalPages } = data;

  if (isLoading)
    return (
      <div>
        <Loading/>
      </div>
    );
  if (isError) return <div></div>;

  return (
    <div className="bg-gray-50 min-h-screen mt-20">
      {/* Trending Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-500 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          Discover Culinary Masterpieces
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto opacity-90">
          Explore trending dishes from top local chefs. Taste the passion in every bite.
        </p>
      </section>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-10">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10 bg-white p-4 rounded-xl shadow-lg flex items-center gap-2 mt-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for chefs or meals..."
            className="w-full text-lg outline-none text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Meals Grid */}
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-500">No meals found matching your search.</h3>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-6 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="text-gray-600 font-medium">
            Page <span className="text-amber-600 font-bold">{currentPage}</span> of{" "}
            {totalPages || 1}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => (totalPages ? Math.min(prev + 1, totalPages) : prev + 1))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-6 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 font-semibold shadow-sm hover:shadow hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="bg-white py-16 mt-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Why Foodies Love Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Fresh Ingredients", desc: "Sourced locally for the best flavor.", icon: "🥗" },
              { title: "Top Rated Chefs", desc: "Curated professionals with a passion for food.", icon: "👨‍🍳" },
              { title: "Fast Delivery", desc: "Hot and fresh, right to your doorstep.", icon: "🚀" }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-amber-50/50 hover:bg-amber-50 transition-colors">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Meals;
