// OPEN AI Tester for more than one row in a spreadsheet
// Pulls from sheet and runs through Open AI
// Had to add "type":"module" to package.js for this to work



// Company information
var theCompany = "Half a Hire is a company that offers support staff as well as fractional and full-time skilled office workers at an affordable price. Half a Hire does not offer temporary workers.";
var prompt = null;
// Setup for OpenAI
var theStuff = null;

import OpenAI from "openai";
const openai = new OpenAI({
    //apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.myopenaikey
});

// Setup for Google Sheet Reader
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
//var spreadsheetId = '1WxwedSkFvJmzFNnJJpL6M39W773L6UdKOby1pV3hDoY' // pulls from the file called testCompare
var spreadsheetId = '1pe7U_jZAX9t1jdReke9NcTlNW-rHXa4rFlUsD7QZgKU' // pulls from evanShubinHalfAHireNew103023
var tabId = 'Sheet1';
var parser = new PublicGoogleSheetsParser(spreadsheetId);

// GET the Google Sheet Data
getIt(theStuff,(theResult)=>{
    // prompt = "Summarize this a sentance: " + theResult[9].summary;
    // console.log(theResult[9].summary);

    aiTheStuff(theResult,()=>{
		// Push the array to the Google Write fn to put them into the spreadsheet
        // console.log('got the AI Stuff');

        // Now call the GOOGLE SHEET WRITER fn once return with all the rows
        // and write them cell by cell
        // maybe first have them written as new rows to see it work
        // then line them up


	})
})

// ********************** GOOGLE PARSER  **********************
function getIt(theStuff,callback){
	parser.parse(spreadsheetId, tabId).then((items) => {
		//console.log('postContent:',items[0].postContent); // Works great to here
        // console.log(items.length);
		callback(items)
		})  // end Parser
}

// Loop through the results and get the OpenAI responses
async function aiTheStuff(theResult,callback){

    const theLengthOfIt = theResult.length;
    
    for (var x = 0;x<2;x++) { // FOR TESTING SMALL BATCH

        prompt = "Given this person's LinkedIn summary: " + theResult[x].summary + "explain how fractional office support workers could help them with administrative tasks. Start your response with, 'Based on your expertise with '. Do this in 175 characters or less with a casual writing style.";
        let res = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            //model: "gpt-3.5-turbo",
            model: "gpt-4"
            //temperature: 2,
            //top_p: 0.8
        });
        console.log(x, res.choices[0].message.content + " Please connect with me if you are open to exploring this further.");
        //console.log(prompt);
        
        // PUSH THEM TO AN ARRAY HERE
        // Callback the array
    }
    callback()
}


// WRITE TO GOOGLE SHEET
// Step 1: First function to get authentication
// async function getTheCreds(context, updatedQuestionsArray) {
//     //console.log('at the creds!');
//         let myPromise = new Promise(function(resolve) {
//           resolve(doc.useServiceAccountAuth(creds));
//         });
//         await myPromise;
//         //console.log('got the creds!');
//         // Call the async function to load the sheet needed
//         loadTheSheet(context, updatedQuestionsArray);
//       }
    
//     // Step 2: Goes here to load sheet once have authentication
//     async function loadTheSheet(context, updatedQuestionsArray) {
//         let secondPromise = new Promise(function(resolve) {
//             resolve(doc.loadInfo()); 
//         });
//         await secondPromise;
//         //console.log(doc.title);
//         const sheet = doc.sheetsByIndex[0];
//         //console.log('Sheet title: ', sheet.title);
//         //console.log('Number updating: ', updatedQuestionsArray.length);
    
//         // Call the async function to add rows to Google sheet
//         addSomeRows(context, sheet,updatedQuestionsArray);
    
//     }
    
//     // Step 3: Last step is to add some rows
//     async function addSomeRows(context, sheet,updatedQuestionsArray){
    
//         let thirdPromise = new Promise(function(resolve){
//             //resolve(sheet.addRow({name: 'david p h', phone: '+12523053884',email: 'haasdp@gmail.com'}))
//             resolve(sheet.addRows(updatedQuestionsArray))
//         })
//         await thirdPromise;
//         //console.log('wrote the new rows');
//         context.succeed('all done writing to google sheets');
//     }
    

