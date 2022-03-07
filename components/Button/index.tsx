
type ButtonType = 'primary' | 'secondary' | 'ghost';
type HtmlButtonType = 'submit' | 'reset' | 'button';

export type ButtonProps = {
    onClick(e: React.MouseEvent<HTMLButtonElement>): void;
    type?: ButtonType;
    htmlType?: HtmlButtonType;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    htmlType = 'button',
    type = 'primary',
    disabled = false
}) => {
    return(
        <>
        <button 
            onClick={onClick}
            type={htmlType}
            disabled={disabled}
        >
            {children}
        </button>
        <style jsx>{`

            button{
                border: unset;
                display: inline-flex;
                background-color:${type === 'primary'? '#476ff5':'#e5e7ee'};
                color:${type === 'primary'? 'white':'#476ff5'};
                border-radius:4px;
                width:100%;
                max-width: 100%;
                white-space: nowrap;
                text-align: center;
                font-size:inherit;
                padding:0.75em;
               // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                visibility:${type === 'ghost'? 'hidden':'visible'};
                justify-content: center;
            }

            button::disabled{
                cursor: not-allowed;
                opacity: 0.5;
            }

        `}</style>
        </>
    )
    
} 

export default Button;