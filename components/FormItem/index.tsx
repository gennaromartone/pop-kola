import {FC} from'react';

export type FormItemStatus = 'valid' | 'success' | 'error' | 'warning' | 'danger';

export type FormItemProps = {
    status?: FormItemStatus;
    label?: string;
}

const FormItem:FC<FormItemProps> = ({status,label,children})=>{
    return(
        <div>
            {label && <label>{label}</label>}
            {children}

            <style jsx>{`

                label{
                    position:absolute;
                    left:0;
                    top:5px;
                    color: #3f5ec4;
                }

                div{
                    margin-block-start:1.5rem;
                    height: 50px;
                    position: relative;
                    display: flex;
                    justify-content: stretch;
                    width: 100%;
                    align-items: self-end;
                    color:${status === 'error'?'red':'inherit'};
                }
            `}</style>
        </div>
    )
}
export default FormItem;

