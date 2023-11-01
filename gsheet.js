// READ and WRITE TO A GOOGLE SHEET
// Move the creds to process.ENV variables to keep secret
// DISABLED GOOGLE SERVICE ACCOUNT: Need new creds to work
// GO HERE: console.cloud.google.com to setup a new one



// const { GoogleSpreadsheet } = require('google-spreadsheet');
import { GoogleSpreadsheet } from 'google-spreadsheet';
const doc = new GoogleSpreadsheet ('1QCdEtQ5KtQ-Hvb8_fxsqEPr9mwogGVJmjkHPhpUmToY'); // testingAPIsheet on haasdp account
// const creds = require('./top-campaign-350200-373f2e7918a7.json'); // the creds file

const getWriteKey = Buffer.from(process.env.getWriteKey , 'base64').toString('ascii');

const creds = {
    "type": "service_account",
    "project_id": "top-campaign-350200",
    "private_key_id": process.env.private_key_id,
    "private_key": getWriteKey,
    "client_email": "haasdp@top-campaign-350200.iam.gserviceaccount.com",
    "client_id": "115973351226664040812",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/haasdp%40top-campaign-350200.iam.gserviceaccount.com"
  };


// For testing - writes data to rows in first, second and third new rows
var updatedQuestionsArray = [[8,8,8,8,8,1,5,6],[2,7,7,2,5],[3,6,5,4,3,3,8,9,0]];

// Call the AUTH function
getTheCreds(updatedQuestionsArray);

async function getTheCreds(updatedQuestionsArray) {
// This function gets the google authorization completed
    let myPromise = new Promise(function(resolve) {
      resolve(doc.useServiceAccountAuth(creds));
    });
    await myPromise;
    //console.log('got the creds!');
    // Call the async function to load the sheet needed
    loadTheSheet(updatedQuestionsArray);
  }

// Step 2: This function loads the sheet once have authentication
// Reads and writes to the sheet
async function loadTheSheet(updatedQuestionsArray) {
    let secondPromise = new Promise(function(resolve) {
        resolve(doc.loadInfo()); 
    });
    await secondPromise;
    // Spreadsheet is now loaded
    //console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    

    // STEP 3: READ ROWS and Print them out
      await readSomeRows(sheet);
      console.log('finished');

    // STEP 4: ADD ROWS to the Sheet
        //await addSomeRows(sheet,updatedQuestionsArray);
        //console.log('added demo rows now i call the next step');

  }


// Step 3: READ some Rows
async function readSomeRows(sheet){
  const rows = await sheet.getRows(); // can pass in { limit, offset }
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




// READ AND WRITE ROWS
// console.log(rows[0].get('name')); // 'Larry Page'
// rows[1].set('email') = 'sergey@abc.xyz'; // update a value
// rows[2].assign({ name: 'Sundar Pichai', email: 'sundar@google.com' }); // set multiple values
// await rows[2].save(); // save updates on a row
// await rows[2].delete(); // delete a row


// MORE Stuff
    // console.log(rows[0].name);
    // console.log(rows[0].email);
    //console.log('Num Rows:', sheet.rowCount);
    // await sheet.loadCells('A1:E10');
    // const a1 = sheet.getCell(0, 1);
    // console.log(a1.value);

// OTHER STUFF
//     const sheet = await doc.addSheet({ headerValues: ['name','email']});
//     // append rows
// const larryRow = await sheet.addRow({ name: 'Larry Page1', email: 'larry1@google.com' });
// const moreRows = await sheet.addRows([
//   { name: 'Sergey Brin2', email: 'sergey@google.com' },
//   { name: 'Eric Schmidt2', email: 'eric@google.com' },
// ]);

// Step 3 Read: Last step is to READ some rows
// async function getStuff(sheet,updatedQuestionsArray){

//   let thirdPromise = new Promise(function(resolve){
//       //resolve(sheet.addRow({name: 'david p h', phone: '+12523053884',email: 'haasdp@gmail.com'}))
//       // resolve(sheet.addRows(updatedQuestionsArray))
//       resolve(sheet.getRows())

//   })
//   // await thirdPromise;
//   await thirdPromise;
// // const rows = sheet.getRows();
// // console.log(rows[0].get('name'));
//}