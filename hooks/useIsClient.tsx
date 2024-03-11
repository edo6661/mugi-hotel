import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
export default function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return !isClient ? null : true;
}
