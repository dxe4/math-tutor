import React from "react";
import useFetchBios from "./hooks/useFetchBios";
import BiosStAndrewTable from "./components/StAndrewBios";

const BioPage = () => {
  const { data, isLoading, error } = useFetchBios();

  return (
    <div className="data-page">
      <h2 style={{ textAlign: "center" }}>St andrew biographies</h2>
      <BiosStAndrewTable data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default BioPage;
