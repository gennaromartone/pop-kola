
import Input, { InputType } from '@components/Input';
import { Question } from '@models/Survey';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import useSWR from 'swr'
import { post, put, _delete } from '@service/httpClient';

import styles from './Questions.module.css';
import Modal from '@components/Modal';
import ConfirmModalContent from '@components/Modal/confirmModal';
import AddQuestionModalContent from '@components/Modal/addQuestionModal';
import {RiArrowUpLine,RiArrowDownLine} from "react-icons/ri";
import Link from 'next/link';


const fetcher = (url:string) => fetch(url).then((res) => res.json());

type QuestionProps = {
    inputTye: InputType,
    value: string,
}

type Arrayish = { [n: number]: QuestionProps };
type MutateQuestion ={
    mutate:number;
    questions:Question[]
}

const QuestionsPage:NextPage = ()=>{

    const { data, error, mutate:mutateList } = useSWR(`/api/survey`, fetcher);
    const [statusInput, setStatusInput] = useState<Arrayish>({});
    const [saveButton, setSaveButton] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);
    const [idQuestionOperation, setIdQuestionOperation] = useState(0);
    const [questionsState, setQuestionsState] = useState<MutateQuestion>({mutate:0,questions:[]});

    useEffect( ()=>{
        if( data?.questions)
        {
            let staInp:Arrayish = {};
            data.questions.forEach( (q:Question) =>{
                    staInp = {...staInp, ...{[q.id]:{inputTye:'ghost',value:q.question}}}
                })
            
            setStatusInput(staInp);
            setQuestionsState({mutate:1,questions:data.questions});
        }
        false && setSaveButton;
    },[data]);

    const handleModify = (id:number) =>{
        const staInp:Arrayish = {...statusInput};

        if( staInp[id].inputTye === 'modify'){
            staInp[id].value = data.questions[id].question;
        }

        staInp[id].inputTye = staInp[id].inputTye === 'ghost'?  'modify':'ghost';
        setStatusInput(staInp);
    }

    const handleModifyAction = async (id:number) =>{
        const staInp:Arrayish = {...statusInput};
        const q:Question = data.questions.find( (q:Question) => q.id === id );
        if( staInp[id].inputTye === 'modify'){
            
            try{
                q.question = staInp[id].value;
                await post<void>('/api/survey',{question:q, surveyId:data.id});
                staInp[id].inputTye = staInp[id].inputTye === 'ghost'?  'modify':'ghost';
                setStatusInput(staInp);
            }
            catch(err){
                console.log(err);
            }
        }
        else{
            
            try{
                q.question = staInp[id].value;
                
                const newS = data.questions.filter((qData:Question) => {
                    return qData.id !== id
                      
                });
                data.questions = newS;
                const newData =  {...data}; 

                await mutateList(newData, false);

                await _delete<void>('/api/survey',{question:q, surveyId:data.id});

                staInp[id].inputTye = staInp[id].inputTye === 'ghost'?  'modify':'ghost';
                //setStatusInput(staInp);
            }
            catch(err){
                console.log(err);
            }

        }
        
    }

    // const handleSave = (id:number) =>{
    //     const staInp:Arrayish = {...statusInput};
    //     staInp[id].inputTye = staInp[id].inputTye === 'ghost'?  'modify':'ghost';
    //     setStatusInput(staInp);
    // }

    const handleAdd = async (question:Question) =>{
        // data.questions.push(question);
        // const newData = {...data};
        // await mutateList(newData);
        await post<void>('/api/survey',{question, surveyId:data.id});
        window.location.reload();
    }

    const handleOnChange = (value:string|number|undefined, id:number) =>{
        if(value){
            const staInp:Arrayish = {...statusInput};
            staInp[id].value = value+'';
            setStatusInput(staInp);
        }
        
    }

   const handleQuestionPositionDown = async (index:number)=>{
        const q = data.questions;
        const element = q.splice(index, 1)[0];
        q.splice(index+1, 0, element);
        data.questions = q;
        const newData = {...data};
        await mutateList(newData, false);
        await put<void>('/api/survey',{questions:q, surveyId:data.id});
        setQuestionsState({mutate:questionsState.mutate+1, questions:newData.questions});
   }
   const handleQuestionPositionUp = async (index:number)=>{
        
    const q = data.questions;
    const element = q.splice(index, 1)[0];
    q.splice(index-1, 0, element);
    data.questions = q;
    const newData = {...data};
    await mutateList(newData, false);
    await put<void>('/api/survey',{questions:q, surveyId:data.id});
    setQuestionsState({mutate:questionsState.mutate+1, questions:newData.questions});
}

    if (error) return <div>An error has occurred.</div>
    if (!data) return <div>Loading...</div>
    
    return(
        <main className={styles.main}>
            <header>
                    Questionario Informativo Nuova Bevanda
                    <nav>
                        <span className='span' onClick={()=> false}>Salva Nuova Versione Questionario</span>
                        <span  onClick={()=> setOpenAddQuestionModal(true)}>Aggiungi Domanda</span>
                        <span><Link href={'/survey'}>Guarda pagina questionario</Link></span>
                    </nav>
            </header>
            <section className={styles.section}>
                
                {/* <SliderSurvey 
                    questions={data.questions}
                    idSurvey={data.id}
                /> */}
                <div>
                    <ol>
                    {questionsState?.questions.map( (q:Question, index:number) =>{
                        return(
                            <div className='line' key={q.id}>
                                <li >
                                    <Input value={statusInput[q.id]?statusInput[q.id].value:''} onChange={(val:string|number|undefined)=>{handleOnChange(val,q.id)}} status={statusInput[q.id]?.inputTye}></Input>
                                    <span onClick={() =>{handleModify(q.id)}}>{statusInput[q.id]?.inputTye === 'ghost'?'Modifica':'Annulla'}</span>
                                    <span onClick={() =>{setIdQuestionOperation(q.id) ;statusInput[q.id].inputTye === 'modify'?handleModifyAction(q.id):setOpenConfirmModal(true);}}>{statusInput[q.id]?.inputTye === 'ghost'?'Cancella':'Salva'}</span>
                                </li>
                                <div className='actionLine'>
                                    {index!==0 && <span style={{marginBlockEnd:'.3rem', cursor:'pointer'}} onClick={()=>{handleQuestionPositionUp(index)}}><RiArrowUpLine/>Sposta sopra</span>}
                                    {index !== data.questions.length-1 && <span style={{marginBlockStart:'.3rem',cursor:'pointer'}} onClick={()=>{handleQuestionPositionDown(index)}}><RiArrowDownLine/>Sposta sotto</span>}
                                </div>
                            </div>
                        )
                    })}
                    </ol>
                </div>
            </section>
            {openConfirmModal &&
                <Modal setIsOpen={(openConfirmModal)=>{setOpenConfirmModal(openConfirmModal)}}>
                    <ConfirmModalContent setIsOpen={(openConfirmModal)=>{setOpenConfirmModal(openConfirmModal)}} 
                        callBack={()=>{handleModifyAction(idQuestionOperation)}}/>
                </Modal>
            }
            {openAddQuestionModal &&
                <Modal setIsOpen={(openAddQuestionModal)=>{setOpenAddQuestionModal(openAddQuestionModal)}}>
                    <AddQuestionModalContent setIsOpen={(openAddQuestionModal)=>{setOpenAddQuestionModal(openAddQuestionModal)}} 
                        callBack={handleAdd}/>
                </Modal>
            }
            
            <style jsx>{`
            .actionLine{
                flex:.2;
                display:flex;
                flex-direction:column;
            }
            .line{
                margin-block-start: 1.2rem;
                display: flex;
                width: 100%;
                justify-content: space-between;
                border-block-start: 1px solid #eeeeee;
                align-items: baseline;
            }
                header{
                    font-weight: bold;
                    font-size: 24px;
                    color: #596fdd;
                    text-align: center;
                    margin-top:.25rem;
                    max-width: 1080px;
                    max-height: 100px;
                    width: 100%;
                    margin:auto;
                    position:absolute;
                    height: 90px;
                    box-shadow: 0px 5px 3px -5px #e1dbdb;
                }
                nav{
                    display:flex;
                    width: auto;
                    gap:1rem;
                    margin-block-start: 2rem
                }
                li{
                    // margin-block-start:1.2rem;
                    color:#303b72;
                    font-weight:600;
                    // border-block-start: 1px solid #eeeeee;
                    padding-block-start: 0.8rem;
                    width: 100%;
                    flex: .9;
                }
                .span{
                    margin-inline-start:1rem;
                    color:#476ff5;
                    cursor:${saveButton?'pointer':'unset'};
                    font-size:1rem;
                    opacity:${saveButton?'1':'.5'};
                }
                span{
                    margin-inline-start:1rem;
                    color:#476ff5;
                    cursor:pointer;
                    font-size:1rem;
                }
            `}</style>
        </main>
    )
    
};

export default QuestionsPage;