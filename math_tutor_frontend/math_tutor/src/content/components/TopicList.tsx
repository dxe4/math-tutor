import React from "react";
import { TopicData } from "../../types/apiTypes";

interface DataListProps {
  data: TopicData[];
  isLoading: boolean;
  error: string | null;
}

const DataList: React.FC<DataListProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="data-list">
      {data.map((item) => (
        <div key={item.id} className="data-item">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </div>
  );
};
export default DataList;
