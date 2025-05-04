"use client";
import React, { use, useEffect, useState } from "react";
import {
  Card,
  Button,
  Rate,
  Radio,
  Space,
  Typography,
  message,
  Tag,
  Divider,
} from "antd";
import { HeartOutlined, HeartFilled, HomeOutlined } from "@ant-design/icons";
import { useCart } from "@/contexts/CartContext";
import Rating from "@/components/Rating";
import { useDrinks } from "@/hooks/useDrinks";

const { Title, Text, Paragraph } = Typography;

const DrinkDetailPage = (props) => {
  const slug = props.params.slug;
  const [drink, setDrink] = useState({});
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { cart, dispatch } = useCart();
  const { getDrinkBySlug } = useDrinks();

  const sizes = ["S", "M", "L"];

  useEffect(() => {
    getDrinkBySlug(slug).then((data) => {
      setDrink(data);
    });
  }, []);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: drink.id,
        name: drink.name,
        price: drink.variants[0].price,

        image: drink.imageUrl,
        size: selectedSize,
        quantity: quantity,
      },
    });
    message.success("Added to cart successfully");
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <div className="bg-[#f5e6d3] py-6">
      <div className="max-w-7xl mx-auto  bg-gray-50 rounded-lg p-6 flex divide-x">
        <div className="sticky top-0 w-1/2 pr-8">
          {/* Image Section */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={drink.imageUrl}
              alt="Drink"
              className="w-full h-[80vh] object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4 w-1/2 divide-y max-h-[80vh] pl-8 pr-4">
          <div className=" flex items-center justify-between">
            <Text className="text-3xl font-semibold">{drink.name}</Text>
            <Tag color="green" className="text-xl italic ">
              {drink.category?.name}
            </Tag>
          </div>

          <Text className="pt-4 text-gray-600 text-lg">
            {drink.description || "No description available."}
          </Text>
          {/* <div className="flex flex-col divide-y divide-gray-300"> */}
          <div className=" flex items-center gap-4 pt-6 pb-2">
            <Text className="text-2xl font-semibold">Item price:</Text>
            <Tag color="volcano" className="text-5xl italic p-2 w-fit">
              ${drink.variants && drink.variants[0]?.price}
            </Tag>
          </div>

          <div className=" flex flex-col gap-4 pt-4">
            <Text className="text-lg font-semibold">Options:</Text>
            <div className="flex items-center gap-4 pl-6">
              <h3 className="">Size:</h3>
              <Radio.Group
                value={selectedSize}
                buttonStyle="solid"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <>
                  {sizes.map((size) => (
                    <Radio.Button key={size} value={size}>
                      {size}
                    </Radio.Button>
                  ))}
                </>
              </Radio.Group>
            </div>
            <div className="flex items-center gap-4 pl-6">
              <h3 className="">Quantity:</h3>
              <div className="border border-gray-400 rounded-md w-fit">
                <button
                  onClick={handleDecrease}
                  className="rounded-md hover:bg-gray-300 w-10 h-8"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-10 h-8 text-center border border-gray-300 rounded"
                />
                <button
                  onClick={handleIncrease}
                  className="rounded-md hover:bg-gray-300 w-10 h-8"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}

          <div size="large" className="pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full text-white px-4 py-2 mb-2 text-lg bg-rose-800 rounded-md hover:bg-rose-700 ring-1 ring-white"
            >
              Add to cart
            </button>
            <Space>
              <HomeOutlined />
              <Text type="secondary">
                {
                  "Free shipping (delivery only available for orders within a 5km radius)"
                }
              </Text>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinkDetailPage;
