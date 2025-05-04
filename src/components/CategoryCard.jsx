"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ id, name, imageUrl }) => {
  return (
    <Link href={`/menu?category=${name}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#ff6b6b] transition-colors duration-300">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
