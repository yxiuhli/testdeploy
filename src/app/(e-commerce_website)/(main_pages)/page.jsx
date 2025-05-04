"use client";
import { useState, useEffect } from "react";
import { Card } from "antd";

import { ArrowRightIcon, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { useCategories } from "@/contexts/CategoriesContext";
import { useDrinks } from "@/hooks/useDrinks";

const HomePage = () => {
  const router = useRouter();
  const testimonials = [
    {
      id: 1,
      rating: 5,
      date: "03/30/24",
      content:
        "The perfect morning spot! Their artisanal coffee is consistently amazing, and the atmosphere is so cozy. The baristas remember my usual order and always greet me with a smile. It's become my daily ritual!",
      author: "Emma S.",
    },
    {
      id: 2,
      rating: 5,
      date: "02/22/24",
      content:
        "Best cafe in town! Everything is freshly mixed and you can taste the difference. The matcha latte are heavenly, and they pair perfectly with their house blend coffee. This café is a hidden gem!",
      author: "Michael R.",
    },
    {
      id: 3,
      rating: 5,
      date: "02/21/24",
      content:
        "Such a welcoming space to work or meet friends. The wifi is reliable, the tables are spacious, and their seasonal drink specials are always creative. Love the locally sourced ingredients they use!",
      author: "Sarah L.",
    },
  ];
  const stats = [
    { value: "10+", label: "Signature Drinks" },
    { value: "500+", label: "Daily Serves" },
    { value: "2k+", label: "Happy Customers" },
  ];
  const [bestSellingDrinks, setBestSellingDrinks] = useState([]);
  const [recentAddedDrinks, setRecentAddedDrinks] = useState([]);
  const { categories } = useCategories();

  const { getDrinks } = useDrinks();

  const getBestSellingDrinks = getDrinks;
  const getRecentAddedDrinks = getDrinks;

  useEffect(() => {
    getBestSellingDrinks().then((data) => {
      setBestSellingDrinks(data);
    });
    getRecentAddedDrinks().then((data) => {
      setRecentAddedDrinks(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f5e6d3]">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-76px)] bg-[url('/img/hero-pattern.png')] bg-cover bg-center text-white pt-40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center ">
          <div className="bg-stone-900/70 rounded-lg p-12">
            <h1 className="text-5xl font-bold mb-4">Welcome to Yexiu Café!</h1>
            <p className="mb-8 text-lg">
              Experience where every sip is crafted with love, bringing the
              warmth of your favorite café right to your fingertips
            </p>

            <div className="flex space-x-12 ">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex mt-12 gap-6 items-center">
              <button
                onClick={() => router.push("/menu")}
                className="flex gap-1  items-center px-4 py-2 text-lg bg-rose-900 rounded-md hover:bg-rose-800 ring-1 ring-white"
              >
                Order Now
              </button>
              <button
                onClick={() => router.push("/about")}
                className=" px-4 py-2 bg-white text-lg text-black rounded-md hover:text-blue-600 ring-1 ring-white hover:ring-blue-600"
              >
                About Us
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Or scroll down to discover more
            </p>
          </div>
        </div>
      </section>

      {/* Best Selling Items */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-6">Best Selling Items</h2>
            <button
              onClick={() => router.push("/menu")}
              className="flex items-center px-2 py-1 bg-white text-sm text-black rounded-md hover:text-stone-600 ring-1 ring-white hover:ring-stone-600"
            >
              View All Products
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-flow-col auto-cols-[23%] gap-8 overflow-x-auto overscroll-auto snap-x p-4 bg-stone-400 rounded-md">
            {bestSellingDrinks.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Added Drinks */}
      <section className="pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-6">Recent Added Drinks</h2>
            <button
              onClick={() => router.push("/menu")}
              className="flex items-center px-2 py-1 bg-white text-sm text-black rounded-md hover:text-stone-600 ring-1 ring-white hover:ring-stone-600"
            >
              View All Products
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-flow-col auto-cols-[23%] gap-8 overflow-x-auto overscroll-auto snap-x p-4 bg-stone-400 rounded-md">
            {recentAddedDrinks.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold mb-6">Browse By Category</h2>
            <button
              onClick={() => router.push("/categories")}
              className="flex items-center px-2 py-1 bg-white text-sm text-black rounded-md hover:text-stone-600 ring-1 ring-white hover:ring-stone-600"
            >
              View More
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-5 gap-24">
            {categories.slice(0, 5).map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-12 pb-16 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            What Our Customer Says
          </h2>
          <div className="flex items-center gap-4">
            <ChevronLeft
              className="w-24 h-24 cursor-pointer"
              onClick={() => {}}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="cursor-default"
                  bordered={false}
                >
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-5 h-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {testimonial.date}
                    </span>
                  </div>

                  <p className="text-gray-700 mt-4 mb-6 min-h-[100px]">
                    {testimonial.content}
                  </p>

                  <p className="font-serif text-amber-900 italic">
                    {testimonial.author}
                  </p>
                </Card>
              ))}
            </div>
            <ChevronRight
              className="w-24 h-24 cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
