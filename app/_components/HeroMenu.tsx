import { Button } from "@/components/ui/button";
import { BedDouble, Hotel, Plane } from "lucide-react";
import React from "react";

const HeroMenu = () => {
  const mockHomestay = [
    {
      icon: <BedDouble className=" " />,
      title: "Homestay",
    },
    {
      icon: <Hotel className=" " />,
      title: "Flight & Hotel",
    },
    {
      icon: <Plane className=" " />,
      title: "Flights",
    },
    {
      icon: <BedDouble className=" " />,
      title: "Airport Transfer",
    },
  ];
  return mockHomestay.map((item, i) => (
    <Button className="fl-itc gap-1" variant="link" size="lg" key={item.title}>
      {item.icon}
      <p>{item.title}</p>
    </Button>
  ));
};

export default HeroMenu;
