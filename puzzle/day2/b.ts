import { getInputInterator } from "@/utils.ts"
let totalScore = 0

const RESULT = {
  LOSE: "X",
  DRAW: "Y",
  WIN: "Z",
}

const RESULT_SCORE = {
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

const ROUND_SCORE = {
  // lose
  [RESULT.LOSE]: RESULT_SCORE.LOSE,
  // draw
  [RESULT.DRAW]: RESULT_SCORE.DRAW,
  // win
  [RESULT.WIN]: RESULT_SCORE.WIN
}

const WIN_SCORE = {
  // rock - paper
  A: BASIC_SCORE.Y,
  // paper - scissors
  B: BASIC_SCORE.Z,
  // scissors - rock
  C: BASIC_SCORE.X
}

const LOSE_SCORE = {
  // rock - scissors
  A: BASIC_SCORE.Z,
  // paper - rock
  B: BASIC_SCORE.X,
  // scissors - paper
  C: BASIC_SCORE.Y
}

const DRAW_SCORE = {
  // rock - rock
  A: BASIC_SCORE.X,
  // paper - paper
  B: BASIC_SCORE.Y,
  // scissors - scissors
  C: BASIC_SCORE.Z
}

/**
 * X: lose Y: draw Z: win
 */
function calcScoreInOneRound(strategy: string) {
  const [opponent, mine] = strategy.split(" ") as [keyof typeof WIN_SCORE, keyof typeof BASIC_SCORE]

  let score = ROUND_SCORE[mine]

  switch (mine) {
    case RESULT.WIN:
      score += WIN_SCORE[opponent]
      break
    case RESULT.DRAW:
      score += DRAW_SCORE[opponent]
      break
    case RESULT.LOSE:
      score += LOSE_SCORE[opponent]
      break
  }

  return score
}

for await (let line of await getInputInterator(import.meta)) {
  totalScore += calcScoreInOneRound(line)
}

console.log(totalScore)
