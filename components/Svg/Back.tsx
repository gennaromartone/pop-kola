import {FC} from 'react';
import {DefaultIconProps} from './type';

export const ArrowBackIcon: FC<DefaultIconProps> = (props) =>  {
    return <svg width="23px"
        height="21px"
        viewBox="0 0 23 21"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="UI-Survey" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <g id="Icons" transform="translate(-243.000000, -255.000000)" stroke="#3C5FD3" strokeWidth="4">
            <g id="back" transform="translate(254.500000, 265.500000) scale(-1, 1) translate(-254.500000, -265.500000) translate(245.500000, 257.500000)">
                <line x1="4.31427981e-17" y1="8.00000002" x2="18" y2="8.00000002" id="Line"></line>
                <line x1="10.8314209" y1="7.16857907" x2="18.8314209" y2="0.83142097" id="Line" transform="translate(14.831421, 4.000000) rotate(90.000000) translate(-14.831421, -4.000000) "></line>
                <line x1="10.8314209" y1="15.1685791" x2="18.8314209" y2="8.83142097" id="Line" transform="translate(14.831421, 12.000000) scale(-1, 1) rotate(90.000000) translate(-14.831421, -12.000000) "></line>
            </g>
        </g>
    </g>
    </svg>;
};
