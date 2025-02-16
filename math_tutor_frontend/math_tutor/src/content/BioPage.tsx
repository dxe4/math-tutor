import React from "react";
import useFetchBios from "./hooks/useFetchBios";
import BiosStAndrewTable from "./components/StAndrewBios";

const BioPage = () => {
  const { data, isLoading, error } = useFetchBios();

  return (
    <div className="data-page">
      <h1>St andrew topics</h1>
      <BiosStAndrewTable data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default BioPage;
