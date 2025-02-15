import React, { useState } from "react";
import { TopicData } from "../../types/apiTypes";
import IframeModal from "./IframeModal";

interface DataListProps {
  data: TopicData[];
  isLoading: boolean;
  error: string | null;
}

const DataList: React.FC<DataListProps> = ({ data, isLoading, error }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [iframeUrl, setIframeUrl] = useState<string>("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleShowIframe = (url: URL) => {
    setIframeUrl(url.toString());
    setShowModal(true); // Show the modal with the iframe
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  console.log(data);
  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.topic}</td>
              <td>{item.title}</td>
              <td>
                <button onClick={() => handleShowIframe(item.link)}>
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <IframeModal
        show={showModal}
        onClose={handleCloseModal}
        iframeUrl={iframeUrl}
      />
    </div>
  );
};
export default DataList;
