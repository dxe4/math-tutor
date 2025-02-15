import React from "react";
import DataList from "./components/TopicList";
import useFetchTopics from "./hooks/useFetchTopics";

const DataPage = () => {
  const { data, isLoading, error } = useFetchTopics();

  return (
    <div className="data-page">
      <h1>St andrew topics</h1>
      <DataList data={data} isLoading={isLoading} error={error} />
    </div>
  );
};

export default DataPage;
