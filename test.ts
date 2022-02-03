import {
  filterDuds,
  filterIncorrectPosition,
  filterCorrect,
  weerdle,
  wordle,
} from "./src/weerdle.js"

import test from "ava"

test("filterDuds normal", (t) => {
  const results = filterDuds(["f", "z"], ["foo", "bar", "fizz", "buzz"])
  const expected = ["bar"]
  t.deepEqual(results, expected)
})

test("filterIncorrectPosition normal", (t) => {
  const results = filterIncorrectPosition(
    ["f", "z"],
    [1, 2],
    ["fooz", "bar", "fizz", "buzz"]
  )
  const expected = ["fooz"]
  t.deepEqual(results, expected)
})

test("filterCorrect normal", (t) => {
  const results = filterCorrect(
    ["f", "z"],
    [0, 3],
    ["foo", "bar", "fizz", "buzz"]
  )
  const expected = ["fizz"]
  t.deepEqual(results, expected)
})

test("weerdle", (t) => {
  const pastWords = [
    "PROXY",
    "SHIRE",
    "SOLAR",
    "PANIC",
    "TANGY",
    "ABBEY",
    "FAVOR",
    "DRINK",
    "QUERY",
    "GORGE",
    "CRANK",
    "SLUMP",
    "BANAL",
    "TIGER",
    "SIEGE",
    "TRUSS",
    "BOOST",
    "REBUS",
    "POINT",
    "ROBOT",
    "PRICK",
    "WINCE",
    "CRIMP",
    "SUGAR",
    "WHACK",
    "MOUNT",
    "PERKY",
    "COULD",
    "LIGHT",
    "THOSE",
    "MOIST",
    "SHARD",
  ].map((w) => w.toLowerCase())
  pastWords.forEach((word) => {
    const result = weerdle(wordle(word))
    t.assert(result < 5)
  })
})
