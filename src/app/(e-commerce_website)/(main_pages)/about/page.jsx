"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MapPin, Mail, Phone, Clock, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

// Dynamically import the Map component with SSR disabled
const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0">
          <Image
            src="/img/interior.jpg"
            alt="Café interior"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-serif text-white tracking-wide">
            ABOUT US
          </h1>
        </div>
      </div>
   {/* Mission Statement */}
   <div className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-serif text-center text-brown-800 italic">
          Crafting moments of joy, one cup at a time
        </h2>
        <p className="text-lg text-center mt-6 text-gray-700">
          Welcome to Yexiu Café, where we craft extraordinary beverages for
          every palate and preference. Since 2015, we've been more than just a
          coffee shop – we're a destination for drink enthusiasts seeking both
          traditional and innovative refreshments. Our extensive menu features
          artisanal coffee creations alongside vibrant fruit smoothies,
          fresh-pressed juices, and authentic milk teas, all prepared with
          premium ingredients and meticulous attention to detail.
        </p>
      </div>

      {/* Our Story */}
      <div className="bg-gray-100 py-16">
        {/* Direct From Our Kitchen */}
        <div className="max-w-6xl mx-auto px-4 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/img/barista.jpg"
                alt="Barista"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-serif mb-4">Crafted With Care</h3>
              <p className="text-gray-900 leading-relaxed">
                Our passionate team of skilled baristas and mixologists takes
                pride in crafting each drink to perfection. From our signature
                espresso drinks made with house-roasted beans to our refreshing
                tropical smoothie bowls blended with seasonal fruits, we ensure
                every sip delivers a moment of pure satisfaction. Our milk tea
                selection draws inspiration from traditional Asian recipes,
                featuring hand-selected tea leaves and house-made boba pearls.
                For those seeking healthier options, our cold-pressed juice bar
                offers invigorating blends that showcase the natural sweetness
                of fresh fruits and vegetables.
              </p>
            </div>
          </div>
        </div>

        {/* Crafted with Care */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-6 ">
              <h3 className="text-2xl font-serif mb-4">Warm Relaxing Space</h3>
              <p className="text-gray-900 leading-relaxed">
                At Yexiu Café, we believe in creating a place where customers
                can explore a world of beverages while enjoying a warm, inviting
                atmosphere. Our thoughtfully designed space features comfortable
                seating arrangements, from cozy corners perfect for focused work
                to communal tables ideal for casual meetings. With high-speed
                fiber internet throughout the café and plenty of easily
                accessible power outlets, we provide the perfect environment for
                remote work or study sessions. Our carefully curated playlist
                and optimal lighting create a balanced atmosphere that
                transitions seamlessly from energetic mornings to relaxed
                afternoons. Whether you need a productive workspace or a
                peaceful retreat, our contemporary industrial-meets-comfort
                design offers the perfect backdrop for every moment of your day.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/img/atmosphere.jpg"
                alt="Atmosphere"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="h-[550px] w-full px-32 py-8 flex justify-between items-center bg-amber-900">
        {/* Interactive Map Banner */}
        <div className="w-3/5 h-full">
          <DynamicMap />
        </div>

        {/* Floating Contact Card */}
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-md h-fit">
          <h2 className="font-serif text-2xl mb-6">Connect With Us</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-gray-700">
              <MapPin className="w-5 h-5 text-amber-700" />
              <p>
                168 Ta Quang Buu Street, Dong Hoa District,
                <br />
                Di An City, Binh Duong, Vietnam
              </p>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <Clock className="w-5 h-5 text-amber-700" />
              <div>
                <p>Offline: Open 24/7</p>
                <p>Online: 8:00 - 20:00</p>
              </div>
            </div>
            <div className="h-px bg-gray-200 my-4" />
            <div className="flex items-center space-x-4 text-gray-700">
              <Phone className="w-5 h-5 text-amber-700" />
              <p>(+84) 0 0000 0000</p>
            </div>
            <div className="flex items-center space-x-4 text-gray-700">
              <Mail className="w-5 h-5 text-amber-700" />
              <p>support.yexiu@example.com</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex space-x-4 justify-center">
              <a className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors">
                <Instagram className="w-5 h-5 text-amber-700" />
              </a>
              <a className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors">
                <Facebook className="w-5 h-5 text-amber-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;