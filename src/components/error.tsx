import React from "react";

type ErrorProps = {
  load: () => void;
};

const Error = ({ load }: ErrorProps) => {
  return <div>Error</div>;
};

export default Error;
