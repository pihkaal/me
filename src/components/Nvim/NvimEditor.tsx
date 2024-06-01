import axios from "axios";
import { useEffect, useState } from "react";

export const NvimEditor = (props: { source: string | undefined }) => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!props.source) return;
    setLoading(true);
    axios.get<string>(props.source).then(({ data }) => {
      setData(data);
      setLoading(false);
    });
  }, [props.source]);

  return <p>{loading ? "Loading..." : data}</p>;
};
