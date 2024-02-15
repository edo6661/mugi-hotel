"use client";
import { SignInButton, UserButton } from "@clerk/nextjs";
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

  return (
    <section>
      {user ? <UserButton /> : <SignInButton>Login</SignInButton>}
      <br />
      <button disabled={pending} onClick={onClick}>
        Add Hotel
      </button>
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
