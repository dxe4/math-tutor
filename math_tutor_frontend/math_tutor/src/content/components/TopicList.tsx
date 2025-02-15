import React, { useState } from "react";
import { TopicData } from "../../types/apiTypes";
import { Table, Input, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataListProps {
  data: TopicData[];
  isLoading: boolean;
  error: string | null;
}

const DataList: React.FC<DataListProps> = ({ data, isLoading, error }) => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string>("");

  // Handle modal
  const showModal = (link: string) => {
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedLink("");
  };

  // Search filter
  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const columns: ColumnsType<TopicData> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.title.toLowerCase().includes(value.toString().toLowerCase()) ||
          record.topic.toLowerCase().includes(value.toString().toLowerCase())
        );
      },
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link: URL) => (
        <a onClick={() => showModal(link.toString())}>View Content</a>
      ),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Search Input */}
      <Input.Search
        placeholder="Search topics..."
        allowClear
        enterButton
        size="large"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* Table */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.title} // Assuming title is unique
      />

      {/* Modal with iframe */}
      <Modal
        title="Content Preview"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ top: 20 }}
      >
        <iframe
          src={selectedLink}
          style={{
            width: "100%",
            height: "80vh",
            border: "none",
          }}
          title="Content Preview"
        />
      </Modal>
    </div>
  );
};

export default DataList;
