openai.js - works!
I started with openai.js which will read a google sheet,
import the contents of the sheet and then feed them to OpenAI

looper.js - works!
I then added an async function to loop through each of the results
in the google sheet and get the ai analysis

gsheet.js - works!
Reads and writes to a google sheet
Keep in mind that I may need to change the auth method as I am using an older version
I had to backup to a version that worked

getwrite.js - working on this one ... 
This one will read the sheet, call open ai and write back to the spreadsheet
Note that I should move away from the Google Sheet Parser and replace that with the code in gsheet

