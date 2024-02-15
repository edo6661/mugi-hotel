"use client";
import { UserButton } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useApiMutation from "@/hooks/useApiMutation";

export default function Home() {
  const { mutate, pending } = useApiMutation(api.hotel.create);
  const data = useQuery(
    api.hotels.get
    // ! kalo punya args
    // {}
  );
  if (data === undefined) {
    return <div>loading data...</div>;
  }

  const onClick = () => {
    console.log("sukses");
    mutate({
      name: "test hotel-2",
    });
  };

  return (
    <section>
      <p>authenticated</p>
      <UserButton />
      <button disabled={pending} onClick={onClick}>
        Add Hotel
      </button>
      <br />
      <br />
      {pending && <p>Pending...</p>}
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
