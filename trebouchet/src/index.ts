//Avent of Code
/*
    1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet

In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.
*/
import {FILE} from './inputFile'

//const FILE= FS.readFileSync('./input.txt', 'utf-8'); 
function linesToArray(file: string){
    const lines= file.split('\n');
    let strInts: number[]= []; 

    for(let i= 0; i< lines.length; i++){
        let matchArr= lines[i].match(/\d/g)
        if(matchArr){
            if(matchArr[1])
                strInts.push(parseInt(matchArr[0] + matchArr.pop()));
            else
                strInts.push(parseInt(matchArr[0] + matchArr[0]));
        }else{
            strInts.push(0);
        }
    };

    return strInts;
}

let theNumbers= linesToArray(FILE);
let initialValue= 0;
let total= theNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

for(let i = 990; i < 1001; i++){
    console.log(theNumbers[i]);
}

console.log(total)
