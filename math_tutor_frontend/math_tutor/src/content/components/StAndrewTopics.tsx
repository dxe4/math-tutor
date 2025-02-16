import React from "react";
import { ColumnsType } from "antd/es/table";
import StAndrewTable from "./StAndrewTable";
import { TopicData } from "../../types/apiTypes";

interface TopicStAndrewTableProps {
  data: TopicData[];
  isLoading: boolean;
  error: string | null;
}

const TopicStAndrewTable: React.FC<TopicStAndrewTableProps> = ({
  data,
  isLoading,
  error,
}) => {
  const topicColumns: ColumnsType<TopicData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "View",
      dataIndex: "link",
      key: "modal-link",
    },
    {
      title: "Visit",
      dataIndex: "link",
      key: "external-link",
    },
  ];

  return (
    <StAndrewTable<TopicData>
      data={data}
      columns={topicColumns}
      isLoading={isLoading}
      error={error}
      searchConfig={{
        placeholder: "Search topics...",
        searchableFields: ["title", "topic"],
      }}
      linkConfig={{
        modalKey: "modal-link",
        externalKey: "external-link",
        modalTitle: "Content Preview",
      }}
      getLinkContent={(record) => record.link.toString()}
      footnote={
        <>
          *Data is licensed under the{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License.
          </a>
        </>
      }
    />
  );
};

export default TopicStAndrewTable;
