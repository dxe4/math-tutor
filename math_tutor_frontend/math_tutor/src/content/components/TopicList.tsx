import React, { useState } from "react";
import { TopicData } from "../../types/apiTypes";
import { Table, Input, Modal, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
const { Text } = Typography;

interface DataListProps {
  data: TopicData[];
  isLoading: boolean;
  error: string | null;
}

const DataList: React.FC<DataListProps> = ({ data, isLoading, error }) => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string>("");

  const showModal = (link: string) => {
    setSelectedLink(link);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedLink("");
  };

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
      title: "View",
      dataIndex: "link",
      key: "link",
      render: (link: URL) => (
        <a onClick={() => showModal(link.toString())}>View Content</a>
      ),
    },
    {
      title: "Visit St Andrew",
      dataIndex: "link",
      key: "visit",
      render: (link: URL) => (
        <a target="_blank" rel="noreferrer" href={link.toString()}>
          Visit St Andrew
        </a>
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
      <Input.Search
        placeholder="Search topics..."
        allowClear
        enterButton
        size="large"
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.title}
      />

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
            filter: "invert(1) hue-rotate(180deg)",
          }}
          title="Content Preview"
        />
      </Modal>
      <Text type="secondary">
        *Data is licensed under the{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Creative Commons Attribution-ShareAlike 4.0 International License.
        </a>
        .
      </Text>
    </div>
  );
};

export default DataList;
