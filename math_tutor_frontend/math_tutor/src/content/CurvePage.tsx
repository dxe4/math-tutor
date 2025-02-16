import React from "react";
import usefetchCurves from "./hooks/useFetchCurves";
import CurvesStAndrewTable from "./components/StAndrewCurves";

const CurvePage = () => {
  const { data, isLoading, error } = usefetchCurves();
  return (
    <div className="data-page">
      <h1>St andrew data</h1>
      <CurvesStAndrewTable data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default CurvePage;
