// READ and WRITE TO A GOOGLE SHEET
// Move the creds to process.ENV variables to keep secret

// const { GoogleSpreadsheet } = require('google-spreadsheet');
import { GoogleSpreadsheet } from 'google-spreadsheet';
// const doc = new GoogleSpreadsheet ('1QCdEtQ5KtQ-Hvb8_fxsqEPr9mwogGVJmjkHPhpUmToY'); // testingAPIsheet on haasdp account
const doc = new GoogleSpreadsheet ('1pe7U_jZAX9t1jdReke9NcTlNW-rHXa4rFlUsD7QZgKU'); // evanShubinHalfAHire103023 on haasdp account
// const creds = require('./top-campaign-350200-373f2e7918a7.json'); // the creds file

// This converts the multiline key to something that it can read
// https://stackoverflow.com/questions/55459528/using-private-key-in-a-env-file

const getWriteKey = Buffer.from(process.env.getWriteKey , 'base64').toString('ascii');

const creds = {
  "type": "service_account",
  "project_id": "top-campaign-350200",
  "private_key_id": "38b2b65f1cb22d34a80312f57d2f0908179128b0",
  "private_key": getWriteKey,
  "client_email": "haasdp@top-campaign-350200.iam.gserviceaccount.com",
  "client_id": "115973351226664040812",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/haasdp%40top-campaign-350200.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// OpenAI API Setup
var prompt = null;
var theResponses = [];

import OpenAI from "openai";
const openai = new OpenAI({
    //apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.myopenaikey
});


// For testing - writes data to rows in first, second and third new rows
//var updatedQuestionsArray = [[8,8,8,8,8,1,5,6],[2,7,7,2,5],[3,6,5,4,3,3,8,9,0]];

// Call the AUTH function
getTheCreds();

// Step 1: Google Auth process
async function getTheCreds() {
// This function gets the google authorization completed
    let myPromise = new Promise(function(resolve) {
      resolve(doc.useServiceAccountAuth(creds));
    });
    await myPromise;
    //console.log('got the creds!');
    // Call the async function to load the sheet needed
    loadTheSheet();
  }

// Step 2: Load the sheet after auth takes place
// Reads and writes to the sheet
async function loadTheSheet() {
    let secondPromise = new Promise(function(resolve) {
        resolve(doc.loadInfo()); 
    });
    await secondPromise;
    // Spreadsheet is now loaded
    //console.log(doc.title);
    // grab the sheet so that we can work with it
    const sheet = doc.sheetsByIndex[0];
    // grab the rows from the sheet
    const rows = await sheet.getRows();
    console.log(rows[0].get('fullName'));

    // Now let's get the ai responses from the data in the sheet
    aiTheStuff(rows,(theResponses)=>{
      // Responses comesback with an array of arrays
      // [number of row, response]

      // Now push to the sheet
      //rows[0].set('invite') = theResponses[0][1]; // update a value
      console.log('all doners')
  
  
    })


    // STEP 3: READ ROWS and Print them out
      //await readSomeRows(sheet);

    // STEP 4: ADD ROWS to the Sheet
       // await addSomeRows(sheet,updatedQuestionsArray);
       // console.log('added demo rows now i call the next step');

  }


// Step XXX: Loop through the results and get the OpenAI responses
async function aiTheStuff(rows,callback){

  //const rows = await sheet.getRows(); // can pass in { limit, offset }
  const theLength = rows.length;
  var tempStuff = null;
  
 for (var x = 0;x<2;x++) { // FOR TESTING SMALL BATCH

      prompt = "Given this person's LinkedIn summary: " + rows[x].summary + "explain how fractional office support workers could help them with administrative tasks. Start your response with, 'Based on your expertise with '. Do this in 175 characters or less with a casual writing style.";
      let res = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          //model: "gpt-3.5-turbo",
          model: "gpt-4"
          //temperature: 2,
          //top_p: 0.8
      });
      tempStuff = res.choices[0].message.content + " Please connect with me if you are open to exploring this further.";
      theResponses.push(x,tempStuff);
      console.log(tempStuff);

  }
  callback(theResponses)
}


// Step 3: READ some Rows
async function readSomeRows(rows){
    for(var x=0;x<rows.length;x++){
      console.log(rows[x].name,rows[x].email, rows[x].c)
    }
return;
  }
  

// Step 4: WRITE some rows
async function addSomeRows(sheet,updatedQuestionsArray){

    let thirdPromise = new Promise(function(resolve){
        //resolve(sheet.addRow({name: 'david p h', phone: '+12523053884',email: 'haasdp@gmail.com'}))
        resolve(sheet.addRows(updatedQuestionsArray))
    })
    await thirdPromise;
    console.log('all done third promise');
    return;
    
}

