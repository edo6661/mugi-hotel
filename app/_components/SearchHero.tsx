import { Search } from "lucide-react";
import React from "react";

const SearchHero = () => {
  return (
    <div className="inner-dest max-w-[793px] ">
      <Search className=" absolute left-4 " />
      <input type="text" placeholder="Enter your destination!" />
    </div>
  );
};

export default SearchHero;
