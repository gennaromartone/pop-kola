import Button from '@components/Button';
import Input from '@components/Input';
import { ArrowBackIcon } from '@components/Svg/Back';
import { ArrowForwardIcon } from '@components/Svg/Forward';
import { Answer, Answers, FieldAnswerEnum, Question } from '@models/Survey';
import {FC, useEffect, useMemo, useState} from 'react';
import styles from './Slider.module.css';
import { post } from '@service/httpClient';
import Router from 'next/router'

export type SliderProps = {
    questions : Question[]
    idSurvey : number
}

const SliderSurvey:FC<SliderProps> = ({questions, idSurvey})=>{

    const [sizeSlider, setSizeSlider] = useState(0);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [data, setData] = useState<Answers>();

    useEffect( ()=>{
        setSizeSlider(questions.length);
        const init:Answers = {idSurvey,answers:[]};
        setData(init);

    },[idSurvey, questions.length]);

    const handleNextAndSave = ()=>{
       // console.log(idSurvey);
        setIndex(index+1);
        const sendData = {...data, answers:[...answers]};
        //console.log(sendData);
        post<Answers>('/api/answers',sendData).then( (ret) => {setData(ret)}).catch( err => console.log(err));
    };

    const handleSave = ()=>{

        const sendData = {...data, answers:[...answers]};
        //console.log(sendData);
        post<Answers>('/api/answers',sendData).then( (ret) => {setData(ret)}).catch( err => console.log(err));
        Router.push('/survey/thanks')
     };


    const getAnswer = useMemo( ()=>{
        return answers && answers[index]? answers[index].answer : '';
    },[answers, index]);

    const handleOnChange = (value?:string | number) =>{
        const anwersCopy = [...answers];
        if(value)
            if( anwersCopy[index]){

                anwersCopy[index].answer = value;
            }
            else{
                anwersCopy.push({idQuestion:questions[index].id, answer:value});
            }
        setAnswers(anwersCopy);
        
    }


    return(
        <section className={styles.section}>
            <div className={styles.slide}>
                <div>
                    <h3 className={styles.h3Question}>{questions[index].question}</h3>
                    {questions[index].suggestion? 
                        <p>({questions[index].suggestion})</p>    
                        :
                        null
                }
                </div>
                
                <div style={{alignSelf:'baseline'}}>

                    {   questions[index].field === FieldAnswerEnum.area?
    
                        <Input field={FieldAnswerEnum.area} value={getAnswer} onChange={handleOnChange}></Input>
                        :
                        <Input value={getAnswer} onChange={handleOnChange}></Input>
                    }
                </div>
                <div className={styles.progressContainer}>
                    {index!==0? <Button type='secondary' onClick={() => setIndex(index-1)}><ArrowBackIcon/>  </Button>
                        :
                            <Button type='ghost' onClick={()=> null}></Button>}
                    <span>
                        <div className="tooltiptext">{index+1}/{sizeSlider}</div>
                        <progress className={styles.progress} value={index} max={sizeSlider-1}></progress>
                    </span>
                    {index!==sizeSlider-1? <Button type='primary' onClick={() => handleNextAndSave()}><strong>Next</strong> &nbsp; <ArrowForwardIcon/></Button>
                    :
                    <Button type='primary' onClick={()=> handleSave()}><strong>Save</strong></Button>}
                </div>
                
            </div>
            {/* <ul>
                {questions.map( (q:Question)=>{
                    return <div key={q.id}>
                        <ol>{q.question}</ol>
                        <div>
                            <textarea>
                                
                            </textarea>
                        </div>
                    </div>
                    })
                }
            </ul> */}
            <style jsx>{`
            span{
                position:relative;
            }
            .tooltiptext {
                width: 50px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: ${(100/((sizeSlider-1)/index))+'%'};
                margin-left: -28px;
                transition: opacity 0.3s;
              }
              .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
              }
            
            `}</style>
        </section>
        
    );
}

export default SliderSurvey;