import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BedDouble, Calendar, Search } from "lucide-react";
import SearchHero from "../_components/SearchHero";
import HomeCard from "../_components/HomeCard";

export default function Home() {
  return (
    <section className="hero">
      <Image
        width={1440}
        height={392}
        alt="hero-img"
        src="/hero.jpeg"
        priority
      />
      <article className="inner-hero">
        <h3>SEE THE WORLD FOR LESS FIND YOUR DREAM VACATION SPOT</h3>
        <div className="container-dest">
          <SearchHero />
          <HomeCard />
        </div>
      </article>
      <article className=" min-h-screen">
        <h4 className="title text-secondaryGray ">
          RECOMMENDED DESTINATION FOR YOU
        </h4>
        <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2">
          {/* {data.map((hotel) => (
            <CardsHotels key={hotel._id} {...hotel} />
          ))} */}
        </div>
        <div className="fl-itc justify-center py-4">
          <Button className=" bg-primaryCyan">See More</Button>
        </div>
      </article>
    </section>
  );
}
