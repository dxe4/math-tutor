import React, { useState } from "react";
import { Table, Input, Modal, Typography } from "antd";
import type { ColumnsType, ColumnType, ColumnGroupType } from "antd/es/table";
import type { Key } from "antd/es/table/interface";
const { Text } = Typography;

interface BaseDataItem {
  id: string | number;
}

interface LinkConfig {
  modalKey: string;
  externalKey: string;
  modalTitle?: string;
}

interface StAndrewTableProps<T extends BaseDataItem> {
  data: T[];
  columns: ColumnsType<T>;
  isLoading: boolean;
  error: string | null;
  searchConfig?: {
    placeholder: string;
    searchableFields: (keyof T)[];
  };
  linkConfig?: LinkConfig;
  footnote?: React.ReactNode;
  getLinkContent: (record: T) => string;
}

function StAndrewTable<T extends BaseDataItem>({
  data,
  columns,
  isLoading,
  error,
  searchConfig,
  linkConfig,
  footnote,
  getLinkContent,
}: StAndrewTableProps<T>) {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<string>("");

  const showModal = (content: string) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedContent("");
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const addLinksToColumns = (columns: ColumnsType<T>): ColumnsType<T> => {
    if (!linkConfig) return columns;

    return columns.map((column) => {
      if ("children" in column) {
        return {
          ...column,
          children: addLinksToColumns(column.children),
        };
      }

      const typedColumn = column as ColumnType<T>;

      if (typedColumn.key === linkConfig.modalKey) {
        return {
          ...typedColumn,
          render: (_, record: T) => (
            <a onClick={() => showModal(getLinkContent(record))}>
              View Content
            </a>
          ),
        };
      }

      if (typedColumn.key === linkConfig.externalKey) {
        return {
          ...typedColumn,
          render: (_, record: T) => (
            <a href={getLinkContent(record)} target="_blank" rel="noreferrer">
              Visit St Andrew
            </a>
          ),
        };
      }

      return typedColumn;
    });
  };

  const enhanceColumn = (
    column: ColumnGroupType<T> | ColumnType<T>,
  ): ColumnGroupType<T> | ColumnType<T> => {
    if (!searchConfig || column.key !== columns[0].key) {
      return column;
    }

    return {
      ...column,
      filteredValue: [searchText],
      onFilter: (value: Key | boolean, record: T) =>
        searchConfig.searchableFields.some((field) =>
          String(record[field])
            .toLowerCase()
            .includes(String(value).toLowerCase()),
        ),
    };
  };

  const getEnhancedColumns = (): ColumnsType<T> => {
    if (!searchConfig) return addLinksToColumns(columns);
    return addLinksToColumns(columns.map((column) => enhanceColumn(column)));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {searchConfig && (
        <Input.Search
          placeholder={searchConfig.placeholder}
          allowClear
          enterButton
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      )}

      <Table columns={getEnhancedColumns()} dataSource={data} rowKey="id" />

      {linkConfig && (
        <Modal
          title={linkConfig.modalTitle || "Content Preview"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width="80%"
          style={{ top: 20 }}
        >
          <iframe
            src={selectedContent}
            style={{
              width: "100%",
              height: "80vh",
              border: "none",
              filter: "invert(1) hue-rotate(180deg)",
            }}
            title="Content Preview"
          />
        </Modal>
      )}

      {footnote && <Text type="secondary">{footnote}</Text>}
    </div>
  );
}

export default StAndrewTable;
