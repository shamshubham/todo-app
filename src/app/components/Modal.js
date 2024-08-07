import styles from "./Modal.module.css";
const Modal = ({ isModalOpen, onClose, children }) => {
  if (!isModalOpen) return null;
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
