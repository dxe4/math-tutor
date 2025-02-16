import React from "react";
import usefetchCurves from "./hooks/useFetchCurves";
import CurvesStAndrewTable from "./components/StAndrewCurves";

const CurvePage = () => {
  const { data, isLoading, error } = usefetchCurves();
  return (
    <div className="data-page">
      <h2 style={{ textAlign: "center" }}>Curves</h2>
      <CurvesStAndrewTable data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default CurvePage;
