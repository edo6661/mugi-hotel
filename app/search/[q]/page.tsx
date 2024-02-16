"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

interface Props {
  params: { q: string };
}
const Search = ({ params }: Props) => {
  const data = useQuery(api.hotels.getHotelsWithQuery, {
    q: decodeURI(params.q),
  });
  return params.q;
};

export default Search;
