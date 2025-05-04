"use client";
import CategoryCard from "@/components/CategoryCard";
import Image from "next/image";
import { useCategories } from "@/contexts/CategoriesContext"; 
import { Spin } from "antd";

const CategoriesPage = () => {
  const { categories, loading, error } = useCategories(); 
  
  return (
    <div className="min-h-[500px] bg-[#f5e6d3]">
      <div className="relative flex items-center justify-between bg-[#ff6b6b]">
        <Image
          src="/img/title-background-left.png"
          alt="title"
          width={362}
          height={400}
          className="object-fit"
        />
        <h1 className="text-white text-6xl font-bold text-center">
          Categories
        </h1>
        <Image
          src="/img/title-background-right.png"
          alt="title"
          width={345}
          height={400}
          className="object-fit"
        />
      </div>

      <div className="max-w-7xl pt-8 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load categories.</div>
        ) : (
          <div className="pt-10 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
