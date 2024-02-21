import { Star, StarIcon, Stars } from "lucide-react";
import React from "react";
import { FaStar } from "react-icons/fa6";

const MockStar = () => {
  return Array.from({ length: 5 }, (_, i) => (
    <FaStar key={i} size={24} color="orangered" />
  ));
};

export default MockStar;
