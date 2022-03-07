import FormItem from '@components/FormItem';
import Input from '@components/Input';
import { FieldAnswerEnum, Question } from '@models/Survey';
import {FC, useState} from 'react';
import styles from "./Modal.module.css";

export type AddQuestionModalContentProps = {
    setIsOpen: (open:boolean) => void;
    callBack: (question:Question)=> void;
}

const AddQuestionModalContent:FC<AddQuestionModalContentProps> = ({setIsOpen, callBack})=>{

  const [question, setQuestion] = useState<Question>({id:-1, question:'', field:FieldAnswerEnum.input, suggestion:''});

    return(
        <>
          <div className={styles.modalContentAddQuestion}>
            <div>
              <h4>Per inserire una nuova domanda, compila i campi qui sotto.</h4>
              <p>La domanda verrà aggiunta alla fine del questionario</p>
            </div>
          
            <div>
              <FormItem label='Inserisci la Domanda:'>
                <Input  autoFocus={true} value={question.question} onChange={(value:string|number|undefined, )=>{ setQuestion({...question, question:value+''})}} status="modify" />
              </FormItem>
              <FormItem label='Inserisci se presente un suggerimento alla domanda:'>
                <Input value={question.suggestion?question.suggestion:''} onChange={(value:string|number|undefined, )=>{ setQuestion({...question, suggestion:value+''})}} status="modify" />
              </FormItem>
              <FormItem label='Come deve essere il campo di risposta:'>
                <select onChange={(e)=>{const val = e.target.options[e.target.options.selectedIndex].value; setQuestion({...question, field:val as unknown as FieldAnswerEnum})}}>
                  <option value={FieldAnswerEnum.input}>Una sola linea</option>
                  <option value={FieldAnswerEnum.area}>Una text area</option>  
                </select>

              </FormItem>
              
            </div>
            <div className={styles.modalActions}>
              <div className={styles.actionsContainer}>
                <button className={styles.deleteBtn} onClick={() => {callBack && callBack(question); setIsOpen(false)} }>
                  Inserisci
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
          <style jsx>{`
          h4{
            margin:0;
          }
          `}</style>
        </>
    )
}

export default AddQuestionModalContent;