/*
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?
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

const minimunSetPower= gamePrimitiveValues.map((gameObj)=>{
    let powers= 0;
    let minRed= 0;
    let minGreen= 0;
    let minBlue= 0;
    for(let i = 0; i < gameObj.games.length; i++){
        if( gameObj.games[i].red > minRed)
            minRed= gameObj.games[i].red;
        if(gameObj.games[i].green > minGreen)
            minGreen= gameObj.games[i].green;
        if(gameObj.games[i].blue > minBlue)
            minBlue= gameObj.games[i].blue;
    }
    
    switch(true){
        case minRed < 1 :
            minRed = 1;
            
        case minGreen < 1 :
            minGreen = 1;
            
        case minBlue < 1 :
            minBlue = 1;

        default:
            return minRed * minGreen * minBlue;
    }
});

let initialValue= 0;
console.log(minimunSetPower.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue))
