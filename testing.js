// READ and WRITE TO A GOOGLE SHEET
// Move the creds to process.ENV variables to keep secret
// DISABLED GOOGLE SERVICE ACCOUNT: Need new creds to work
// GO HERE: console.cloud.google.com to setup a new one



// const { GoogleSpreadsheet } = require('google-spreadsheet');
import { GoogleSpreadsheet } from 'google-spreadsheet';
const doc = new GoogleSpreadsheet ('1QCdEtQ5KtQ-Hvb8_fxsqEPr9mwogGVJmjkHPhpUmToY'); // testingAPIsheet on haasdp account
// const creds = require('./top-campaign-350200-373f2e7918a7.json'); // the creds file

const getWriteKey2 = Buffer.from(process.env.getWriteKey2 , 'base64').toString('ascii');

const creds = {
  "type": "service_account",
  "project_id": "top-campaign-350200",
  "private_key_id": "8a81fbec9edbb399207c05983cdd25beb60fd936",
  "private_key": getWriteKey2,
  "client_email": "haasdp@top-campaign-350200.iam.gserviceaccount.com",
  "client_id": "115973351226664040812",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/haasdp%40top-campaign-350200.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};


console.log('all done works')