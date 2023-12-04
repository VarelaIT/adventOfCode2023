/*



*/

import {file, testCase, testCase2} from './inputFile';

const digitReg= /\d/;
const noSymbolReg= /[^\.]/;
const symbolReg= /[^\.\d]/;

//console.log(testCase2);



function getLines(inputStr: string){
    return inputStr.split('\n').map((line)=> line.split(''));
}




interface ChunkInterface {
    previous: number;
    current: number;
    next: number;
}

function chunkLines(lines: number, index: number){
    let lineChunk: ChunkInterface= {
        previous: -1,
        current: -1,
        next: -1
    }
    if(index === 0)
        lineChunk= {previous: -1, current: 0, next: 1};
    else if(index === lines - 1)
        lineChunk= {previous: index -1, current: index, next: -1};
    else
        lineChunk= {previous: index - 1, current: index, next: index + 1};
    
    return lineChunk;
}




function findSymbol(line: string[], i: number){
    if((i > 0 && line[i - 1].match(noSymbolReg)) || (i < line.length && line[i].match(noSymbolReg)) || (i < line.length - 1 && line[i + 1].match(noSymbolReg)))
        return true;

    return false;
}




function restOfNumber(line: string[], i: number, values: string[]){
    let f= i + 1; 
    while(f < line.length){
        if(line[f].match(digitReg))
            values.push(line[f]);
        else 
            break;
        f++;
    }

    return {integer: values, index: f};
}





function getValues(input: Array<string[]>, chunk: ChunkInterface){
    let values: number[]= [];
    let testValue: string[]= [];

    for(let i= 0; i < input[chunk.current].length; i++){

        if(input[chunk.current][i].match(digitReg)){
            testValue.push(input[chunk.current][i]);
            if((chunk.previous >= 0 && findSymbol(input[chunk.previous], i)) || (chunk.next >= 0 && chunk.next < input.length && findSymbol(input[chunk.next], i))){
                const resp= restOfNumber(input[chunk.current], i, testValue)
                values.push(parseInt(resp.integer.join('')));
                testValue= [];
                i= resp.index
            }
        }else if(input[chunk.current][i].match(symbolReg)){

            if(testValue.length > 0){
                 values.push(parseInt(testValue.join('')));
                testValue= [];
            }

            if(input[chunk.current][i + 1].match(digitReg)){
                const resp= restOfNumber(input[chunk.current], i, testValue)
                values.push(parseInt(resp.integer.join('')));
                testValue= [];
                i= resp.index
            }    
        }else{
            testValue= [];
        }
    }
    //console.log(values)

    return values;
}


function resolve(linesArr: Array<string[]>){
    let value: number= 0; 
    for(let i = 0; i < linesArr.length; i++){
        let result= getValues(linesArr, chunkLines(linesArr.length, i));
        let initialValue= 0;
        value += result.length > 0 ? result.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue) : 0 ;
    }

    console.log(value);
}

const input= getLines(file);
resolve(input);


