export interface SurveyData{
    survey:Survey[]
}

export interface Survey{
    id:number
    questions: Question[];
    countId:number;
}

export interface Question{
    id:number,
    question: string,
    field: FieldAnswerEnum,
    suggestion?: string
}

export enum FieldAnswerEnum {'input'='input', 'area'='area'};

export interface AnswersData{
    data:Answers[];
}
export interface Answers{
    id?:number,
    idSurvey:number,
    answers: Answer[],
    dateCreated?:string,
    dateUpdated?:string
}

export type Answer ={
    idQuestion: number,
    answer: string | number
}