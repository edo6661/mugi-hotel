interface Props {
  params: { q: string };
}
const Search = ({ params }: Props) => {
  return params.q;
};

export default Search;
