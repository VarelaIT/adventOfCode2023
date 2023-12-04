import {file, testCase, testCase2} from './inputFile';

const gearReg= /\*/;
const noSymbolReg= /[^\.]/;
const digitReg= /\d/;

//console.log(testCase);



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




function findDigit(line: string[], i: number): number[]{
    let coord: number[]= [];
    if(i > 0 && line[i - 1].match(digitReg))
        coord.push(i - 1);

    if(i < line.length && line[i].match(digitReg) && coord.length === 0)
        coord.push(i);
    
    else if(i < line.length - 1 && !line[i].match(digitReg) && line[i + 1].match(digitReg))
        coord.push(i + 1);
    
    return coord;
}




function restOfNumber(line: string[], i: number[], valueArr: number[]): number[]{
    let value: string[]= [];
    //console.log('indexes: ', i)

    if(i.length === 1){
        if(i[0] < 0)
            return valueArr;

        let f= i[0] - 2; 
        while(f < line.length && f < i[0] + 3){
            if(line[f].match(digitReg))
                value.push(line[f]);
            else if (value.length === 1 && f === i[0] - 1)
                value= [];
            f++;
        }

        valueArr.push(parseInt(value.join('')))
        //console.log(valueArr)
        return valueArr;
    }else if(i.length === 2){
        if(line[i[0] - 2].match(digitReg))
            value.push(line[i[0] - 2]);
        if(line[i[0] - 1].match(digitReg))
            value.push(line[i[0] - 1]);
        value.push(line[i[0]]);
        valueArr= [parseInt(value.join(''))];
        value= [];
        
        
        if(line[i[1]].match(digitReg))
            value.push(line[i[1]]);
        if(line[i[1] + 1].match(digitReg))
            value.push(line[i[1] + 1]);
        value.push(line[i[1] + 2]);
        valueArr.push(parseInt(value.join('')));
        
        //console.log('valores', valueArr)
        return valueArr;
    }

    return valueArr;
}





function getValues(input: Array<string[]>, chunk: ChunkInterface){
    let values: number[]= [];

    for(let i= 0; i < input[chunk.current].length; i++){
        let testValue: number[]= [];

        if(input[chunk.current][i].match(gearReg)){
            //console.log('gear', input[chunk.current][i], chunk.current)
            if(chunk.previous >= 0) 
                testValue= restOfNumber(input[chunk.previous], findDigit(input[chunk.previous], i), testValue);

            if(testValue.length === 2){
                values.push(testValue[0] * testValue[1]);
                testValue= [];
            } 
                
            if(i - 3 >= 0 && input[chunk.current][i - 1].match(digitReg))
                testValue=  restOfNumber(input[chunk.current],  [i - 1], testValue);
                
            if(testValue.length === 2){
                values.push(testValue[0] * testValue[1]);
                testValue= [];
            } 
                
            if(i + 1 < input[chunk.current].length && input[chunk.current][i + 1].match(digitReg))
                testValue=  restOfNumber(input[chunk.current],  [i + 1], testValue);
                
            if(testValue.length === 2){
                values.push(testValue[0] * testValue[1]);
                testValue= [];
            } 
                
            if(chunk.next > 0 && chunk.next < input.length) 
                testValue= restOfNumber(input[chunk.next], findDigit(input[chunk.next], i), testValue);

            if(testValue.length === 2){
                values.push(testValue[0] * testValue[1]);
                testValue= [];
            } 
                
        }
    }
    //console.log('values=', values)

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

const input2d= getLines(file);
let input2dPart: Array<string[]>= [];

/*
//console.log(input2d.length)
for(let i = 10; i < 20; i++){
    input2dPart.push(input2d[i]);
    console.log(input2d[i].join(''))
}
*/

resolve(input2d);

