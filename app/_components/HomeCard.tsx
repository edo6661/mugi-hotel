import { Button } from "@/components/ui/button";
import React from "react";
import { BedDouble, Calendar, Hotel, Plane } from "lucide-react";
import { ContainerCalendar, SecondContainerCalendar } from "./Calendars";
import HeroMenu from "./HeroMenu";

const HomeCard = () => {
  return (
    <>
      <div className=" space-y-6">
        <div className="container-menu">
          <HeroMenu />
        </div>
        <div className="fl-itc gap-4">
          <ContainerCalendar
            date1="24 Feb 2024"
            day1="Sabut"
            date2="24 Feb 2024"
            day2="Sabut"
          />
          <SecondContainerCalendar date="24 Feb 2024" day="Sabut" />
        </div>
      </div>
      <Button className=" bg-primaryCyan absolute -bottom-4 w-[612px] p-2 font-semibold text-white rounded-2xl text-base primary-shadow">
        Search
      </Button>
    </>
  );
};

export default HomeCard;
