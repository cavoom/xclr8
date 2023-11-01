// OPEN AI Tester - responds to one record
// See looper.js for a for loop that loops through all records in a sheet
// mynewopenaikey

var prompt = null;
var theStuff = null;

// Setup for OpenAI
import OpenAI from "openai";
const openai = new OpenAI({
    //apiKey: process.env.OPENAI_API_KEY,
    apiKey: process.env.mynewopenaikey
});

// Setup for Google Sheet Reader
import PublicGoogleSheetsParser from 'public-google-sheets-parser'
// var spreadsheetId = '1gN40X_0meJ1n1Wvwpy-_RhvZqZu-Q2Z_khKxZMxo3mM'; // Pulls from the file called postContent on CAVOOM
var spreadsheetId = '1WxwedSkFvJmzFNnJJpL6M39W773L6UdKOby1pV3hDoY' // pulls from the file called testCompare
var tabId = 'Sheet1';
var parser = new PublicGoogleSheetsParser(spreadsheetId);

//exports.handler = (event, context, callback) => {

// GET the Google Sheet Data
getIt(theStuff,(theResult)=>{

	prompt = "given this linkedin profile summary: " + theResult[9].summary + " and Evan Shubin's LinkedIn profile summary: " + theResult[0].evanShubin + "write a linkedin invitation from Evan Shubin on how Half A Hire could benefit them. Start by recognizing what the first profile does.  Then talk about how Half A Hire could assist them. Do this in 299 or fewer characters. Please include something about how Half A Hire might help them. Start with 'Hello ' if there is a first name mentioned. If there is no first name mentioned, do not provide a salutation. Do not mention that you admire or are impressed with their work. Do not compliment them or their business. End with this sentance and do not modify it, 'Please connect with me if you are open to exploring ... ";
	// prompt = " compare the two columns in this google sheet and tell me what the similarities are: https://docs.google.com/spreadsheets/d/1WxwedSkFvJmzFNnJJpL6M39W773L6UdKOby1pV3hDoY/edit?usp=sharing"
	console.log('analyzing ... ');
	
	//Create a loop to call aiStuff for each row
	aiStuff(prompt,(theAnswer)=>{
		console.log(theAnswer)
	})



})


//} // End Handler

// ********************** GOOGLE PARSER  **********************
function getIt(theStuff,callback){
	parser.parse(spreadsheetId, tabId).then((items) => {
		//console.log('postContent:',items[0].postContent); // Works great to here
		callback(items)
		})  // end Parser
}

// ********************** OPEN AI STUFF  **********************
async function aiStuff(prompt,callback){

	// PUT THE FOR LOOP IN HERE AND WRITE TO SPREADSHEET?

	let res = await openai.chat.completions.create({
		messages: [{ role: "user", content: prompt }],
		//model: "gpt-3.5-turbo",
		model: "gpt-4"
		//temperature: 2,
		//top_p: 0.8
	});
	callback(res.choices[0].message.content);
	//callback(theStuff)
}
