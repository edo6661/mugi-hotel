"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useApiMutation from "@/hooks/useApiMutation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BedDouble, Calendar, Search } from "lucide-react";
import HomeCard from "./_components/HomeCard";
import SearchHero from "./_components/SearchHero";
import MockStar from "./_components/MockStar";
import CardsHotels from "./_components/CardsHotels";

export default function Home() {
  const { mutate, pending } = useApiMutation(api.hotel.create);
  const data = useQuery(
    api.hotels.getHotels
    // ! kalo punya args
    // {}
  );
  const user = useQuery(api.user.get);

  if (data === undefined) {
    return <div>loading data...</div>;
  }

  const onClick = () => {
    if (!user) {
      alert("login dlu puh klo mw add aq");
    }
    mutate({
      name: "test hotel-3 asyu tenan",
    });
  };
  console.log(data);
  return (
    <section className="hero">
      <Image width={1440} height={392} alt="hero-img" src="/hero.jpeg" />
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
          {data.map((hotel) => (
            <CardsHotels key={hotel._id} {...hotel} />
          ))}
        </div>
        <div className="fl-itc justify-center py-4">
          <Button className=" bg-primaryCyan">See More</Button>
        </div>
      </article>
    </section>
  );
}
