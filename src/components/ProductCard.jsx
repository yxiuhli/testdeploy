"use client";
import React from "react";
import { Card, Space, Typography, Tag, Button } from "antd";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

const { Text, Paragraph } = Typography;
const { Meta } = Card;

const ProductCard = (drink) => {
  return (
    <Link 
     href={`/drink/${drink.slug}`}>
      <Card
        hoverable
        cover={
          <img
            alt={drink.name}
            src={drink.imageUrl}
            className="h-64 object-cover"
          />
        }
      >
        <Meta
          title={
            <Space className="w-full justify-between">
              <Text className="text-lg" strong>
                {drink.name}
              </Text>
            </Space>
          }
          description={
            <>
              <Paragraph ellipsis={{ rows: 2 }} className="mb-4">
                {drink.description}
              </Paragraph>
              <Space className="w-full justify-between items-center">
                <Button variant="outlined" color="blue" className="w-36 py-4" icon={<ShoppingCartIcon/>}>Add to cart</Button>
                <Tag color="volcano" className="text-xl">
                  ${drink.variants[0].price}
                </Tag>
              </Space>
            </>
          }
        />
      </Card>
    </Link>
  );
};

export default ProductCard;