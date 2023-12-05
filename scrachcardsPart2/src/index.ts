import {file, testCase, testCase2} from './inputFile';

const digitReg= /\d+/;
const pipeDivisionReg= /\|/;

console.log(testCase);

function getLines(inputStr: string){
    return inputStr.split('\n');
}

function divideLines(lines: string[]){
    return lines.map((line)=> line.replace(/Card\s+\d+:/, '').trim().split('|'));
}

function findWinners(lines: Array<string[]>): string[]{
    let winnersList: string[]= [];

    for(let i = 0; i < lines.length; i++){
        let winArray= lines[i][0].trim().split(/\s+/).map((num, i, col)=> {
            if(i === 0)
                return '(?<=\\s|^)' + num + '(?=\\s|$)|'
            else if(i === col.length - 1)
                return '(?<=\\s|^)' + num + '(?=\\s|$)'
            else
                return '(?<=\\s|^)' + num + '(?=\\s|$)|'
        });
        let expression= winArray.join('');
        winnersList.push(expression);
    } 

    return winnersList;
}


function getMatches(winStr: string[], lines: Array<string[]>){
    let matches: Array<string[]>= [];

    for(let i = 0; i < lines.length; i++){
        const winReg= new RegExp(winStr[i], 'g');
        const points= lines[i][1].match(winReg);
        if(points && points.length > 0)
            matches.push(points);
        else
            matches.push([]);
    }

    return matches;
}


function calculateMatches(match: Array<string[]>, current: number= 0, until: number= 0, total: number= 0, sub: boolean= false){

    for(let i = current; i < until; i++){ 
        total +=  match[i].length;
        //console.table(match[i])
        //console.log( sub, 'current', i, 'limit', until, 'total', total)
        console.log("index", i, "limit", until)

        for(let r = i + 1; r < match[i].length + 1; r++){
            console.log("index", r, "limit", match[i].length + 1)
            total= calculateMatches(match, r, match[i].length + 1, total, true);
        }
    }

    return total;
}




function resolve(linesArr: string[]){
    const linesDiv= divideLines(linesArr);
    const winnersList= findWinners(linesDiv);
    const matches= getMatches(winnersList, linesDiv);
    console.table(matches)
    const total= calculateMatches(matches, 0, matches.length);
    console.log('total: ', total)
}

const input= getLines(testCase);
resolve(input);


