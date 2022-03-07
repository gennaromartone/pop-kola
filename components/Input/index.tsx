import { FieldAnswerEnum } from '@models/Survey';
import {ChangeEvent, FC} from 'react';
import { Arguments } from 'swr';

export type InputType = 'primary' | 'ghost' | 'modify';

export interface InputProps{
    value:string | number,
    onChange: (value?:string | number, ...args:Arguments[])=>void,
    field?:FieldAnswerEnum,
    status?: InputType,
    autoFocus?:boolean
} 

const Input:FC<InputProps> = ({value, onChange, field, status,autoFocus})=>{

    return(
        <div>
            {
                field && field === 'area'?
                <textarea value={value} tabIndex={1} autoFocus rows={5} onChange={(e: ChangeEvent<HTMLTextAreaElement>)=> { const targetValue = e.target.value; onChange(targetValue)}}/>
                :
                <input disabled={status === 'ghost'} autoFocus={status === 'modify' && autoFocus}  value={value} onChange={(e: ChangeEvent<HTMLInputElement>)=> { const targetValue = e.target.value;; onChange(targetValue)}} />
            }
           
            <style jsx>{`
            div{
                width: inherit;
            }
            textarea{
                border:none;
                width:60vw;
                background-color: white;
                box-sizing: border-box;
                padding: .3em .2em .3em .3em;
                outline: none;
            }
            textarea:focus {
                opacity: 1;
                caret-color: #596fdd;
                border-color: #596fdd;
                border-width: 2px;
            }
            input{
                background-color: white;
                box-sizing: border-box;
                padding: .3em 0 .3em .3em;
                width: 100%;
                outline: none;
                border-style: ${status === 'modify'? 'none none solid none':'none none none none'};
                border-width: 1px;
                transition: all 0.5s linear;
                border-color:#596fdd;
                opacity: 1;
                color:#303b72;
            }
            input:disabled{
                color:#303b72;
                font-weight: inherit
            }
            input:focus {
                opacity: 1;
                caret-color: #596fdd;
                border-color: #596fdd;
                border-width: 2px;
            }
            
            `}</style>
        </div>
    
    );
}

export default Input;