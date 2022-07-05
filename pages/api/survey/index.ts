import { Question, Survey, SurveyData } from '@models/Survey';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import _surveyJson from './../../../public/survey.json';
//const surveyJson:SurveyData = _surveyJson;
const surveyJson = _surveyJson as unknown as SurveyData;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    try {
        
      const {
        method,
      } = req
    
    
      switch (method) {
        case 'GET' /* Get a model by its ID */:
          try {
            if (!Array.isArray(surveyJson.survey)) {
              throw new Error('Cannot find user data')
            }
            const s = surveyJson.survey; 
            const survey:Survey = s[s.length-1];

            res.status(200).json(survey)
          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
    
        case 'POST' /* Edit a model by its ID */:
          try{
            //console.log(req.body);
            const q:Question = req.body.question;
            const surveyId:number = req.body.surveyId; 

            
            if(q.id === -1){
              const questions = surveyJson.survey.find( (s:Survey) => s.id === surveyId)?.questions;
              const index = surveyJson.survey.findIndex((s:Survey) => s.id === surveyId);

              q.id = surveyJson.survey[index].countId+1;
              surveyJson.survey[index].countId = q.id;
              questions?.push(q);
              
              if(index && questions)
                surveyJson.survey[index].questions = questions;

                fs.writeFileSync('data/survey.json', JSON.stringify(surveyJson, null, 4));
                
            }
            else{
              const questions = surveyJson.survey.find( (s:Survey) => s.id === surveyId)?.questions.map((qData:Question) => {
                if( qData.id === q.id)
                  return q;
                else
                  return qData
              });
              const index = surveyJson.survey.findIndex((s:Survey) => s.id === surveyId);

              if( index !== -1 && questions)
                surveyJson.survey[index].questions = questions;

            }
            
                                                                              
            fs.writeFileSync('data/survey.json', JSON.stringify(surveyJson, null, 4));

            res.status(200).json({status:'ok'});

          } catch (error) {
            res.status(400).json({ success: false })
          }
          break
    
        case 'DELETE' /* Delete a model by its ID */:
          try{

            const q:Question = req.body.question;
            const surveyId:number = req.body.surveyId; 

            const s:Survey | undefined = surveyJson.survey.find( (s:Survey) => s.id === surveyId);

            const questions = s?.questions.filter((qData:Question) => {
              return qData.id !== q.id
                
            });
            //console.log(questions);
            
            const index = surveyJson.survey.findIndex((s:Survey) => s.id === surveyId);

            if( index !== -1 && questions)
              surveyJson.survey[index].questions = questions;
                                                                              
            fs.writeFileSync('data/survey.json', JSON.stringify(surveyJson, null, 4));

            res.status(200).json({status:'ok'});

          } catch (error) {
            res.status(400).json({ success: error })
          }
          break

          case 'PUT' /* Delete a model by its ID */:
            try{
  
              const q:Question[] = req.body.questions;
              const surveyId:number = req.body.surveyId; 
  
              const s:Survey | undefined = surveyJson.survey.find( (s:Survey) => s.id === surveyId);
  
              if(s)
                s.questions = q;

                const index = surveyJson.survey.findIndex((s:Survey) => s.id === surveyId);

                if( index !== -1 && s)
                  surveyJson.survey[index] = s;
                                                                                
              fs.writeFileSync('data/survey.json', JSON.stringify(surveyJson, null, 4));
  
              res.status(200).json({status:'ok'});
  
            } catch (error) {
              res.status(400).json({ success: false })
            }
            break
    
        default:
          res.status(400).json({ success: false })
          break
      }  

      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  }
  
  export default handler