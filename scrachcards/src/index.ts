import {file, testCase, testCase2} from './inputFile';

const digitReg= /\d+/;
const pipeDivisionReg= /\|/;

//console.log(testCase2);

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
    }

    return matches;
}


function calculateMatches(match: Array<string[]>){
    let total= 0;
    
    for(let i = 0; i < match.length; i++){
        let points= 0;

        match[i].forEach((assert, i, col)=>{

            if(i === 0 && col.length > 1)
                points= 1
            else if(i === col.length - 1){
                if(points > 0)
                    points *= 2;
                else
                    points+= 1;

                total+= points;
                points= 0;
            }else
                points*= 2;
        });
    }

    return total;
}






function resolve(linesArr: string[]){
    const linesDiv= divideLines(linesArr);
    const winnersList= findWinners(linesDiv);
    const matches= getMatches(winnersList, linesDiv);
    //console.log('matches:')
    //console.table(matches)
    console.log('total: ', calculateMatches(matches))
}

const input= getLines(file);
resolve(input);


