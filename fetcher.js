const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

//  Take two command line arguments.

const url = process.argv[2];
const localPath = process.argv[3];

// Check If the file already exists

fs.exists(localPath, (exists) => {
  console.log(exists);
  if (exists) {
    rl.question(
      'The file already exists. Do you really want to overwrite it? ',
      (answer) => {
        if (answer === 'y' || answer === 'Y') {
          request(url, function (error, response, body) {
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            fs.writeFile(localPath, body, (err) => {
              if (err) {
                console.error(err);
              }
              // file written successfully
              const size = body.length;
              console.log(
                `Downloaded and saved ${size} bytes to ${localPath}.`
              );
              rl.close();
            });
          });
        } else {
          rl.close();
        }
      }
    );
  }
});

// console.log(url);
// console.log(localPath);

// Download and save!!!
// 1. http request, wait for response
// 2. save to file
// 비동기지만 순서대로 실행되게 해야한다!

// console.error('error:', error); // Print the error if one occurred
// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body); // Print the HTML for the Google homepage.

// Save to file
