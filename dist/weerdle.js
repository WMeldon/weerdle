import * as fs from "fs";
import chalk from "chalk";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const _cc = chalk.black.bgGreen;
const _cd = chalk.white.bgGrey;
const _cwp = chalk.black.bgYellow;
const fancyPrint = (guess, result) => {
    return result.reduce((acc, r, i) => {
        if (r === 1) {
            return acc + _cc(guess[i]);
        }
        else if (r === 2) {
            return acc + _cwp(guess[i]);
        }
        else {
            return acc + _cd(guess[i]);
        }
    }, "");
};
// quick clone to avoid objects being linked
const _qc = (s) => JSON.parse(JSON.stringify(s));
const buildLetterRankings = (words) => {
    const letterRanks = Object.fromEntries(alphabet.split("").map((x) => [x, 0]));
    const positionArray = [
        _qc(letterRanks),
        _qc(letterRanks),
        _qc(letterRanks),
        _qc(letterRanks),
        _qc(letterRanks),
    ];
    words.forEach((w) => {
        for (let i = 0; i <= 4; i++) {
            const activeLetter = w[i];
            // if (w.split('').indexOf(activeLetter) < i) return  //bad
            positionArray[i][activeLetter]++;
        }
    });
    return positionArray;
};
const rateWords = (wordList, scores = null) => {
    const positionalScores = scores ? scores : buildLetterRankings(wordList);
    const wordScores = wordList.map((w) => {
        return w.split("").reduce((prev, curr, i) => {
            return prev + positionalScores[i][curr];
        }, 0);
    });
    return wordScores;
};
const topWord = (words, scores) => {
    const sorted = [...scores].sort((a, b) => b - a)[0];
    return words[scores.indexOf(sorted)];
};
//filter out words with no matches
const filterDuds = (forbidden, words) => {
    return words.filter((w) => !forbidden.some((e) => w.includes(e)));
};
// filter for where the letters are correct
const filterIncorrectPosition = (letters, pos, words) => {
    return words.filter((w) => letters.every((e, i) => {
        return w.includes(e) && w[pos[i]] !== e;
    }));
};
const filterCorrect = (letters, pos, words) => {
    return words.filter((w) => letters.every((e, i) => {
        return w.includes(e) && w[pos[i]] === e;
    }));
};
const _letterPosArray = (target, result, word) => {
    return result.reduce((acc, n, i) => {
        if (n === target) {
            acc[0].push(word[i]);
            acc[1].push(i);
        }
        return acc;
    }, [[], []]);
};
const nextList = (result, word, wordList) => {
    const dudLetters = result.reduce((acc, n, i) => {
        if (n === 0)
            acc.push(word[i]);
        return acc;
    }, []);
    const [outPosLetters, outPosPos] = _letterPosArray(2, result, word);
    const [correctLetters, correctPos] = _letterPosArray(1, result, word);
    wordList =
        dudLetters.length === 0 ? wordList : filterDuds(dudLetters, wordList);
    wordList =
        outPosLetters.length === 0
            ? wordList
            : filterIncorrectPosition(outPosLetters, outPosPos, wordList);
    wordList =
        correctLetters.length === 0
            ? wordList
            : filterCorrect(correctLetters, correctPos, wordList);
    return wordList;
};
const wordle = (solution) => {
    return (word) => {
        return solution.split("").map((x, i) => {
            if (x === word[i]) {
                return 1;
            }
            else if (solution.includes(word[i])) {
                return 2;
            }
            else {
                return 0;
            }
        });
    };
};
const weerdle = (dailyWordle, print = false, possibleWords) => {
    let tries = 1;
    const wordles = possibleWords
        ? possibleWords
        : fs.readFileSync("./wordle_valid.txt", "utf-8").split("\n");
    let guess = topWord(wordles, rateWords(wordles));
    let nextWordList = [];
    while (tries < 100) {
        const result = dailyWordle(guess);
        nextWordList = nextWordList.length === 0 ? wordles : nextWordList;
        if (print)
            console.log(fancyPrint(guess, result));
        if (result.every((n) => n === 1))
            break;
        nextWordList = nextList(result, guess, nextWordList);
        guess = topWord(nextWordList, rateWords(nextWordList));
        tries++;
    }
    return tries;
};
export { filterDuds, filterIncorrectPosition, filterCorrect, weerdle, wordle, buildLetterRankings, rateWords, topWord, };
