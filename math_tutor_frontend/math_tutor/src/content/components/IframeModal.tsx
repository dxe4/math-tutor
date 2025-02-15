import React from "react";
import "./iframe_modal_style.css";

interface IframeModalProps {
  show: boolean;
  onClose: () => void;
  iframeUrl: string;
}

const IframeModal: React.FC<IframeModalProps> = ({
  show,
  onClose,
  iframeUrl,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          Close
        </button>
        <iframe
          title="iframe-popup"
          src={iframeUrl}
          width="600"
          height="400"
          frameBorder="0"
          className="iframe"
        />
      </div>
    </div>
  );
};

export default IframeModal;
