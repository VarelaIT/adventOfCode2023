//Avent of Code
/*
--- Part Two ---

Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?

*/
import {FILE} from './inputFile'
import {exampleInput} from './exampleInput'

const decoder= new Map<string, string>();
decoder.set('one', '1');
decoder.set('two', '2');
decoder.set('three', '3');
decoder.set('four', '4');
decoder.set('five', '5');
decoder.set('six', '6');
decoder.set('seven', '7');
decoder.set('eight', '8');
decoder.set('nine', '9');


function linesToArray(file: string): string[]{
    const lines= file.split('\n');
    return lines;
}

function getNumbers(lines: string[]): number[]{
    let strInts: number[]= []; 

    for(let i= 0; i< lines.length; i++){
        let matchArr= lines[i].match(/\d|one|two|three|four|five|six|seven|eight|nine/g);
        let quantity: string;
        if(matchArr){
            const first=  decoder.get(matchArr[0]) || matchArr[0];
            if(matchArr[1]){
                const lastItem= matchArr.pop()!;
                const second= decoder.get(lastItem) || lastItem;
               quantity=  first +  second;
            }else{
                quantity= first + first;
            }
                strInts.push(parseInt(quantity));
        }else{
            strInts.push(0);
        }
    };

    return strInts;
}

let theNumbers= getNumbers(linesToArray(exampleInput));
let initialValue= 0;
let total= theNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);

for(let i = 0; i < 10; i++){
    console.log(theNumbers[i]);
}

console.log(total)
