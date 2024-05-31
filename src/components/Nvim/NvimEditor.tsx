import { useState } from "react";

export const NvimEditor = (props: { source: string | undefined }) => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState(false);

  return <div className="h-full">{props.source}</div>;
};
