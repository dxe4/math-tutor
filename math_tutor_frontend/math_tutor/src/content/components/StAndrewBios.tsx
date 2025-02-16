import React from "react";
import { ColumnsType } from "antd/es/table";
import StAndrewTable from "./StAndrewTable";
import { Biography, TopicData } from "../../types/apiTypes";

interface BiosStAndrewTableProps {
  data: Biography[] | null;
  isLoading: boolean;
  error: string | null;
}

const BiosStAndrewTable: React.FC<BiosStAndrewTableProps> = ({
  data,
  isLoading,
  error,
}) => {
  const bioColumns: ColumnsType<Biography> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
  if (data === null) {
    return <div> </div>;
  }

  return (
    <StAndrewTable<Biography>
      data={data}
      columns={bioColumns}
      isLoading={isLoading}
      error={error}
      searchConfig={{
        placeholder: "Search topics...",
        searchableFields: ["title"],
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

export default BiosStAndrewTable;
