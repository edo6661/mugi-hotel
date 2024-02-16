import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomeInputSearch = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const encodedSearch = encodeURI(search);
    router.push("/search/" + encodedSearch);
  };
  return (
    <form className="relative fl-itc" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Masukan tujuanmu disini"
        className="input-dest"
        onChange={handleSearch}
        value={search}
      />
      <button className="icon-dest">
        <Search />
      </button>
    </form>
  );
};

export default HomeInputSearch;
