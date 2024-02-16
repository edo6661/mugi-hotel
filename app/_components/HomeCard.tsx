import { Button } from "@/components/ui/button";
import React from "react";
import HomeInputSearch from "./HomeInputSearch";
import { Calendar } from "lucide-react";

const HomeCard = () => {
  return (
    <div className=" space-y-4">
      <Button className="primary-btn">Menginap</Button>
      <HomeInputSearch />
      <div className="fl-itc gap-8">
        <div className="container-calendar ">
          <div className="fl-itc gap-2">
            <Calendar size={32} className=" text-secondaryGray" />
            <div className="inner-calendar">
              <p className=" font-semibold">24 Feb 2024</p>
              <p>Sabut</p>
            </div>
          </div>
          <div className="fl-itc ">
            <div className=" w-[2px] bg-secondaryGray h-8 mr-2 " />
            <Calendar size={32} className=" text-secondaryGray mr-2" />
            <div className="inner-calendar">
              <p className=" font-semibold">24 Feb 2024</p>
              <p>Sabut</p>
            </div>
          </div>
        </div>
        <div className="second-container-calender">
          <Calendar size={32} className=" text-secondaryGray" />
          <div className="flex flex-col gap-2 text-xs">
            <p className=" font-semibold">24 Feb 2024</p>
            <p>Sabut</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
