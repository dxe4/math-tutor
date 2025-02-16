import React from "react";
import useFetchTopics from "./hooks/useFetchTopics";
import TopicStAndrewTable from "./components/StAndrewTopics";

const DataPage = () => {
  const { data, isLoading, error } = useFetchTopics();

  return (
    <div className="data-page">
      <h2 style={{ textAlign: "center" }}>St andrew topics</h2>
      <TopicStAndrewTable data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default DataPage;
