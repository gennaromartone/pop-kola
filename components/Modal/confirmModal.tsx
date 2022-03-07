import {FC} from 'react';
import styles from "./Modal.module.css";

export type ConfirmModalProps = {
    setIsOpen: (open:boolean) => void;
    callBack: ()=> void;
}

const ConfirmModalContent:FC<ConfirmModalProps> = ({setIsOpen, callBack})=>{

    return(
        <>
          <div className={styles.modalContent}>
            Sicuro di volere eliminare la domanda?
          
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => {callBack && callBack(); setIsOpen(false)} }>
                  Elimina
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsOpen(false)}
                >
                  Esci
                </button>
              </div>
            </div>
          </div>
        </>
    )
}

export default ConfirmModalContent;