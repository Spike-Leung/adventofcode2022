import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";
let fileReader = await Deno.open("./input.txt");
let totalScore = 0

const MATCH_SCORE = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6
}
const BASIC_SCORE = {
  // Rock
  X: 1,
  // Paper
  Y: 2,
  // Scissors
  Z: 3
}
const X_SCORE = {
  A: MATCH_SCORE.DRAW,
  B: MATCH_SCORE.LOSE,
  C: MATCH_SCORE.WIN,
}

const Y_SCORE = {
  A: MATCH_SCORE.WIN,
  B: MATCH_SCORE.DRAW,
  C: MATCH_SCORE.LOSE,
}

const Z_SCORE = {
  A: MATCH_SCORE.LOSE,
  B: MATCH_SCORE.WIN,
  C: MATCH_SCORE.DRAW,
}

/**
 * A: Rock B: Paper C: Scissors
 * X: Rock Y: Paper Z: Scissors
 */
function calcScoreInOneRound(strategy: string) {
  const [opponent, mine] = strategy.split(" ") as [keyof typeof X_SCORE, keyof typeof BASIC_SCORE]

  let score = BASIC_SCORE[mine]

  switch (mine) {
    case 'X':
      score += X_SCORE[opponent]
      break
    case 'Y':
      score += Y_SCORE[opponent]
      break
    case 'Z':
      score += Z_SCORE[opponent]
      break
  }

  return score
}

for await (let line of readLines(fileReader)) {
  totalScore += calcScoreInOneRound(line)
}

console.log(totalScore)
