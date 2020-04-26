const csvjson = require('csvjson');
const readFile = require('fs').readFile;
readFile('./DATA.csv', 'utf-8', (err, fileContent) => {
    if(err) {
        console.log(err); // Do something to handle the error or just throw it
        throw new Error(err);
    }
    const jsonObj = csvjson.toObject(fileContent);
    console.log(jsonObj);

    var fs = require('fs').writeFileSync;
    var dictstring = JSON.stringify(jsonObj);
    fs("./DATA.json", dictstring);
});