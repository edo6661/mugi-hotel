"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useApiMutation from "@/hooks/useApiMutation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BedDouble, Calendar, Search } from "lucide-react";
import HomeCard from "./_components/HomeCard";

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

  const mockHomestay = [
    {
      icon: <BedDouble className=" " />,
      title: "Homestay",
    },
    {
      icon: <BedDouble className=" " />,
      title: "Homestay",
    },
    {
      icon: <BedDouble className=" " />,
      title: "Homestay",
    },
    {
      icon: <BedDouble className=" " />,
      title: "Homestay",
    },
  ];

  return (
    <section className="relative grid place-items-center">
      <Image
        width={1440}
        height={392}
        alt="hero-img"
        src="/hero.jpeg"
        className="  absolute object-cover h-[396px] w-full -z-10 top-0"
      />
      <article className="inner-section">
        <h3>MELIHAT DUNIA DENGAN HARGA LEBIH MURAH</h3>
        <div className="container-dest">
          <div className="inner-dest">
            {mockHomestay.map((item, i) => (
              <div key={i} className="bed-homestay">
                <BedDouble />
                <p>Homestay</p>
              </div>
            ))}
          </div>
          <HomeCard />
        </div>
      </article>
      {user ? <UserButton /> : <SignInButton>Login</SignInButton>}
      <Button disabled={pending} onClick={onClick}>
        Add Hotel
      </Button>
      <br />
      <br />
      {user && pending && <p>Pending...</p>}
      {data.map((hotel) => {
        return (
          <div key={hotel._id}>
            <p>{hotel.name}</p>
            <p>{hotel.authorName}</p>
            <br />
          </div>
        );
      })}
    </section>
  );
}
