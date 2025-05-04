"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Pagination, Input, Select, Spin } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDrinks } from "@/hooks/useDrinks";
import { useCategories } from "@/contexts/CategoriesContext"; 

const { Search } = Input;

const MenuPage = () => {
  const params = useSearchParams();
  const categoryParam = params.get("category");
  const [drinks, setDrinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [sortBy, setSortBy] = useState("none");
  
  const { getDrinks } = useDrinks();
  const { categories, loading: categoriesLoading, error } = useCategories();

  const minPrice = (drink) => {
    return Math.min(...drink.variants.map((variant) => variant.price));
  }; 

  useEffect(() => {
    getDrinks().then((data) => {
      setDrinks(data);
    });
  }, []);

  const filterDrinks = () => {
    let filtered = [...drinks];

    if (searchQuery) {
      filtered = filtered.filter((drink) =>
        drink.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
        console.log(selectedCategory);
      filtered = filtered.filter((drink) => drink.category.name === selectedCategory);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => minPrice(a) - minPrice(b));
        break;
      case "price-desc":
        filtered.sort((a, b) => minPrice(b) - minPrice(a));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return filtered;
  };

  const filteredDrinks = filterDrinks();

  return (
    <div className="min-h-screen bg-[#f5e6d3]">
      {/* Header */}
      <div className="relative flex items-center justify-between bg-[#ff6b6b]">
        <Image
          src="/img/title-background-left.png"
          alt="title"
          width={362}
          height={400}
        />
        <h1 className="text-white text-6xl font-bold text-center">Menu</h1>
        <Image
          src="/img/title-background-right.png"
          alt="title"
          width={345}
          height={400}
          className="object-fit"
        />
      </div>

      <div className="max-w-7xl py-10 mx-auto">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <Search
                placeholder="Search drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="w-full"
              />

              {/* Category Select */}
              {categoriesLoading ? (
                <Spin />
              ) : (
                <Select
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value)}
                  className="w-full"
                  options={[
                    { value: "all", label: "All Categories" },
                    ...categories.map((cat) => ({
                      value: cat.name,  // or cat.id if your drink.category matches id
                      label: cat.name,
                    })),
                  ]}
                />
              )}

              {/* Sort Select */}
              <Select
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                className="w-full"
                options={[
                  { value: "none", label: "Sort by" },
                  { value: "price-asc", label: "Price: Low to High" },
                  { value: "price-desc", label: "Price: High to Low" },
                  { value: "rating", label: "Highest Rated" },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Drinks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredDrinks.map((drink) => (
            <ProductCard key={drink.id} {...drink} />
          ))}
        </div>

        <Pagination
          align="end"
          defaultCurrent={1}
          total={filteredDrinks.length}
          pageSize={12}
          className="text-right"
        />
      </div>
    </div>
  );
};

export default MenuPage;
