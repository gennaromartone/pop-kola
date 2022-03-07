import { Answers, AnswersData } from '@models/Survey';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

// answers in JSON file for simplicity, answers directory to version
import  _dataAnswer from './../../../data/answers/data.json';
const dataAnswer = _dataAnswer as unknown as AnswersData;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const {
        //query: { id },
        method,
      } = req

      console.log('IP',req.socket.remoteAddress);

      switch (method) {
        // case 'GET':
        //   try {
        //     const pets = await Pet.find({}) /* find all the data in our database */
        //     res.status(200).json({ success: true, data: pets })
        //   } catch (error) {
        //     res.status(400).json({ success: false })
        //   }
        //   break
        case 'POST':
          try {

            console.log(req.body);

            const answers:Answers = req.body   /* create a new json for answers*/

            console.log(answers.id);

            const retData = answers.id !== undefined?update(answers.id,answers):save(answers);

            res.status(201).json(retData);
          } catch (error) {
            console.log(error);
            res.status(400).json({ success: false })
          }
          break
        default:
          res.status(400).json({ success: false })
          break
      }

}


// const getAll = ()=>{
//     return null;
// }

function save(answers:Answers) {
  console.log('SAVE');
    // generate new user id
    answers.id = dataAnswer.data.length ? dataAnswer.data.length : 0;

    // set date created and updated
    answers.dateCreated = new Date().toISOString();
    answers.dateUpdated = new Date().toISOString();

    dataAnswer.data.push(answers);

    fs.writeFileSync('data/answers/data.json', JSON.stringify(dataAnswer, null, 4));
    return answers
}

function update(id:number, answers:Answers) {
  console.log('UPDATE');
    let findAnswers:Answers = dataAnswer.data[id];

    if(findAnswers){
      // update and save
      findAnswers = {...findAnswers, ...answers};

      // set date updated
      findAnswers.dateUpdated = new Date().toISOString();

      dataAnswer.data[id] = findAnswers;

      fs.writeFileSync('data/answers/data.json', JSON.stringify(dataAnswer, null, 4));

      return findAnswers;
    }

    
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
// function _delete(id) {
//     // filter out deleted user and save
//     users = users.filter(x => x.id.toString() !== id.toString());
//     saveData();
    
// }

// private helper functions

// function saveData() {
//     fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
// }

export const usersRepo = {
    //getAll,
    //getById: id => users.find(x => x.id.toString() === id.toString()),
    //find: x => users.find(x),
    save,
    //update,
    //delete: _delete
};