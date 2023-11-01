// WRITE TO A GOOGLE SHEET - OLD
// Check Out getwrite.js
// Disabled Google API Key on Service account
// Go here to get new creds
// console.cloud.google.com

// Setup for writing to Google Sheets
const { GoogleSpreadsheet } = require('google-spreadsheet');
// 1eSuRB8OvhzCkJ1aQUxxam1SGv-R44GkXFSDICbL1Gnk
//const doc = new GoogleSpreadsheet ('1vN8ZqsJ6KdPt4dKSIg-UfFsjcSbTAwv2'); // admr analytics sheet
const doc = new GoogleSpreadsheet ('1QCdEtQ5KtQ-Hvb8_fxsqEPr9mwogGVJmjkHPhpUmToY'); // testingAPIsheet on haasdp account
const creds = require('./top-campaign-350200-373f2e7918a7.json'); // the creds file
//const creds = require('./american-direct-f2c5f-0242193100a3.json'); // ADMR Creds

// For testing - writes data to rows in first, second and third new rows
var updatedQuestionsArray = [[1,1,5,6],[2,2,5],[3,3,8,9,0]];

// Call the AUTH function
getTheCreds(updatedQuestionsArray);


// WRITE TO GOOGLE SHEET
// Step 1: First function to get authentication
async function getTheCreds(updatedQuestionsArray) {
//console.log('at the creds!');
    let myPromise = new Promise(function(resolve) {
      resolve(doc.useServiceAccountAuth(creds));
    });
    await myPromise;
    //console.log('got the creds!');
    // Call the async function to load the sheet needed
    loadTheSheet(updatedQuestionsArray);
  }

// Step 2: Goes here to load sheet once have authentication
async function loadTheSheet(updatedQuestionsArray) {
    let secondPromise = new Promise(function(resolve) {
        resolve(doc.loadInfo()); 
    });
    await secondPromise;
    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
//     const sheet = await doc.addSheet({ headerValues: ['name','email']});
//     // append rows
// const larryRow = await sheet.addRow({ name: 'Larry Page1', email: 'larry1@google.com' });
// const moreRows = await sheet.addRows([
//   { name: 'Sergey Brin2', email: 'sergey@google.com' },
//   { name: 'Eric Schmidt2', email: 'eric@google.com' },
// ]);

// read rows
const rows = await sheet.getRows(); // can pass in { limit, offset }

// read/write row values
    console.log(rows[0].name);
    console.log(rows[0].email);
    //console.log('Num Rows:', sheet.rowCount);
    // await sheet.loadCells('A1:E10');
    // const a1 = sheet.getCell(0, 1);
    // console.log(a1.value);
    console.log(rows.length);

    for(var x=0;x<rows.length;x++){
      console.log(rows[x].name,rows[x].email)
    }

    // Call the async function to add rows to Google sheet
    // addSomeRows(sheet,updatedQuestionsArray);

    // Call the async function to read the Sheet
    //getStuff(sheet, updatedQuestionsArray);

}

// Step 3: Last step is to ADD some rows
async function addSomeRows(sheet,updatedQuestionsArray){

    let thirdPromise = new Promise(function(resolve){
        //resolve(sheet.addRow({name: 'david p h', phone: '+12523053884',email: 'haasdp@gmail.com'}))
        resolve(sheet.addRows(upsdatedQuestionsArray))
    })
    await thirdPromise;
    //console.log('wrote the new rows');
    console.log('all done third promise');
}

// Step 3 Read: Last step is to READ some rows
async function getStuff(sheet,updatedQuestionsArray){

  let thirdPromise = new Promise(function(resolve){
      //resolve(sheet.addRow({name: 'david p h', phone: '+12523053884',email: 'haasdp@gmail.com'}))
      // resolve(sheet.addRows(updatedQuestionsArray))
      resolve(sheet.getRows())

  })
  // await thirdPromise;
  await thirdPromise;
// const rows = sheet.getRows();
// console.log(rows[0].get('name'));


}