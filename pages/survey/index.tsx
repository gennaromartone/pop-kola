import SliderSurvey from '@components/Slider';
import type { NextPage } from 'next'
import useSWR from "swr";
import styles from './Survey.module.css';


const fetcher = (url:string) => fetch(url).then((res) => res.json());


const SurveyPage:NextPage = ()=>{

    const { data, error } = useSWR(`/api/survey`, fetcher)

    if (error) return <div>An error has occurred.</div>
    if (!data) return <div>Loading...</div>
    
    return(
        <main className={styles.main}>
            <section className={styles.section}>
                <header>
                    Questionario Informativo Nuova Bevanda
                </header>
                <SliderSurvey 
                    questions={data.questions}
                    idSurvey={data.id}
                />
            </section>
            <style jsx>{`
                header{
                    font-weight: bold;
                    color: #596fdd;
                    text-align: center;
                    margin-top:.25rem;
                }
            `}</style>
        </main>
    )
    
};

export default SurveyPage;