
const utils = require('./utils');

it('add two numbers',() => {

    var result = utils.add(3,2);
    console.log(result);

    if(result !== 5)
    {
        throw new Error(`Expected 5, but got ${result}`);
    }
});

it('power of numbers',() => {

    var result = utils.power(3,3);
    console.log(result);

    if(result !== 9)
    {
        throw new Error(`Expected 5, but got ${result}`);
    }
});

//run command like npm test
//Restart run command like npm run test-watch