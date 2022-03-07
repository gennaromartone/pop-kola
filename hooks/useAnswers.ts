import { Answers } from "@models/Survey";
import { useState } from "react";

type UseAnswersValue = {
    answers?:Answers;
    updateAnswers: (answers:Answers) => void
}

export const useAnswers = ():UseAnswersValue =>{
    const [answers, setAnswers] = useState<Answers>();

    const updateAnswers = (answers:Answers) => {
        setAnswers(answers);
    }

    return{
        answers,
        updateAnswers
    }
}


    