 // This script converts the private key over to something that I can use
 // in process.env
 // Here's where I got it:
 // https://stackoverflow.com/questions/55459528/using-private-key-in-a-env-file


const creds = {

  };

// Step 1: Run this code in a JS file on your Dev Machine with the actual key included above

const privateKey= creds.private_key;
const buff = Buffer.from(privateKey).toString('base64');
console.log(buff);

// Step 2: Copy the key

// Step 3: Use the key with this converter in the code
//const key = Buffer.from(process.env.getWriteKey , 'base64').toString('ascii');
// Use key anywhere in your code.
