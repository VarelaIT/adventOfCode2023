import {file, testCase, testCase2} from './inputFile';

const digitReg= /\d/;
const noSymbolReg= /[^\.]/;
const symbolReg= /[^\.\d]/;

console.log(testCase);



function getLines(inputStr: string){
    return inputStr.split('\n').map((line)=> line.split(''));
}











function resolve(linesArr: Array<string[]>){
}

const input= getLines(file);
resolve(input);


