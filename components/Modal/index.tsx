// @src/components/Modal.jsx
import {FC} from 'react';
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

type ModalProps = {
    setIsOpen: (open:boolean) => void;
    callback?: ()=> void;

}


const Modal:FC<ModalProps> = ({ setIsOpen, callback, children}) => {


  const handleIsOpen = (isOpen:boolean) =>{
    setIsOpen(isOpen);
    callback && callback();
  };  

  return (
    <>
      <div className={styles.darkBG} onClick={() => handleIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => handleIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;