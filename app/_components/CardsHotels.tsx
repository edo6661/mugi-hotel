import Image from "next/image";
import React from "react";
import MockStar from "./MockStar";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/types/hotel";

const CardsHotels = ({ name, imageUrl, _id }: Hotel) => {
  return (
    <div key={_id} className=" bg-primaryWhite p-2 space-y-2">
      <Image
        src={imageUrl}
        alt={name}
        width={280}
        height={280}
        className="rounded-xl w-full"
      />
      <div className="fl-itc">
        <MockStar />
      </div>
      <h5 className="title-sm">{name}</h5>
      <div className="fl-itc justify-between">
        <p className=" text-secondaryGray">Location</p>
        <Button size="sm" className="rounded-xl bg-blue bg-primaryCyan">
          See Details
        </Button>
      </div>
    </div>
  );
};

export default CardsHotels;
