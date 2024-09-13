export const NvimEditor = (props: { content: string | undefined }) => {
  let rows = props.content?.split("\n") ?? [];
  // trim end empty lines
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].trim().length === 0) {
      rows = rows.slice(0, rows.length - 1);
    } else {
      break;
    }
  }
  // add spaces in empty lines
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].trim().length === 0) {
      rows[i] = " ";
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div
        className="plain-html"
        dangerouslySetInnerHTML={{ __html: props.content ?? "" }}
      />
    </div>
  );
};
