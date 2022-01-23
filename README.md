# WEERDLE

It Solves Wordles.

[Use this bookmarklet][1] to get the days solution.

[1]:javascript:(function()%7Balert(JSON.parse(window.localStorage.getItem('gameState')).solution)%7D)()%3B

```
javascript:(function()%7Balert(JSON.parse(window.localStorage.getItem('gameState')).solution)%7D)()%3B
```

Run like this:

```js
weerdle(wordle(SOLULTION), true)
```

```wordle_valid.txt``` are possible solutions.  ```wordle_invalid.txt``` are valid guesses but not solutions.  