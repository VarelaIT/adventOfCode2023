/*
Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
*/
//import FS from 'fs';
import {inputFile} from './inputFile';

const constrains= {
    red: 12,
    green: 13,
    blue: 14
};
const testCase=
`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;


function gameArray(games: string[]){
    return games.map((game)=>{
        const gameKeyVal= game.match(/\d+|\w+/g)!;
        let gameObj= {
            red: 0,
            green: 0,
            blue: 0
        };

        for(let i= gameKeyVal.length -1; i > -1; i--){
            gameObj= {...gameObj, [gameKeyVal[i]]: parseInt(gameKeyVal[i - 1])};
            i--;
        }

        return gameObj;
    });
}

function getLines(file: string): string[]{
    return file.split('\n');
}

function subDivide(lines: string[]){
    return lines.map((line)=>{
        const divided= line.split(":");
        const gid= divided[0].match(/\d+/g)!;
        const gamesDivided= divided[1].split(";");
        const gamesArrayAsNumber= gameArray(gamesDivided);
        return {id: parseInt(gid[0]), games: gamesArrayAsNumber}
    })
}

const gamePrimitiveValues= subDivide(getLines(inputFile));

const validIndexes= gamePrimitiveValues.map((gameObj)=>{
    let valid= true;
    for(let i = 0; i < gameObj.games.length; i++){
        //console.log(gameObj.games[i])
        if( gameObj.games[i].red > constrains.red || gameObj.games[i].green > constrains.green || gameObj.games[i].blue > constrains.blue){
            valid= false;
            break;
        }
    }
    
    if(valid)
        return gameObj.id;
    else
        return 0;
});

let initialValue= 0;
console.log(validIndexes.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))
