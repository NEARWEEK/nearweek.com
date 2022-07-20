import { useEditions } from "./useEditions";
import { useMemo } from "react";

export const useLatestEdition = () => {
  const { editions } = useEditions();

  const edition = useMemo(() => {
    return editions[0];
  }, [editions]);

  return { edition };
};
