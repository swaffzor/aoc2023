/*
--- Day 7: Camel Cards ---
In Camel Cards, you get a list of hands, and your goal is to order them based on the strength of each hand. A hand consists of five cards labeled one of A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, or 2. The relative strength of each card follows this order, where A is the highest and 2 is the lowest.

Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
Hands are primarily ordered based on type; for example, every full house is stronger than any three of a kind.

If two hands have the same type, a second ordering rule takes effect. Start by comparing the first card in each hand. If these cards are different, the hand with the stronger first card is considered stronger. If the first card in each hand have the same label, however, then move on to considering the second card in each hand. If they differ, the hand with the higher second card wins; otherwise, continue with the third card in each hand, then the fourth, then the fifth.

So, 33332 and 2AAAA are both four of a kind hands, but 33332 is stronger because its first card is stronger. Similarly, 77888 and 77788 are both a full house, but 77888 is stronger because its third card is stronger (and both hands have the same first and second card).

To play Camel Cards, you are given a list of hands and their corresponding bid (your puzzle input). For example:

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
This example shows five hands; each hand is followed by its bid amount. Each hand wins an amount equal to its bid multiplied by its rank, where the weakest hand gets rank 1, the second-weakest hand gets rank 2, and so on up to the strongest hand. Because there are five hands in this example, the strongest hand will have rank 5 and its bid will be multiplied by 5.

So, the first step is to put the hands in order of strength:

32T3K is the only one pair and the other hands are all a stronger type, so it gets rank 1.
KK677 and KTJJT are both two pair. Their first cards both have the same label, but the second card of KK677 is stronger (K vs T), so KTJJT gets rank 2 and KK677 gets rank 3.
T55J5 and QQQJA are both three of a kind. QQQJA has a stronger first card, so it gets rank 5 and T55J5 gets rank 4.
Now, you can determine the total winnings of this set of hands by adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.

Find the rank of every hand in your set. What are the total winnings?
*/
interface HandAndBid {
  hand: string
  bid: number
}

export type CardsAndCount = [string, number][]

export enum HandType {
  HighCard,
  OnePair,
  TwoPair,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

export interface RankData {
  hand: string
  bid: number
  handType: HandType
  cards: CardsAndCount
}

const extractData = (input: string): HandAndBid[] =>
  input.split('\n').map((hand) => {
    const splitHand = hand.split(' ')
    return {
      hand: splitHand[0],
      bid: parseInt(splitHand[1]),
    }
  })

export const part1 = (input: string) => {
  const data = extractData(input)

  const handData = data.map(({ hand, bid }) => {
    const cards = getCardValue(hand)
    const handType = evaluateHand(cards)
    return {
      hand,
      bid,
      handType,
      cards,
    } as RankData
  })
  // sort by hand type and then by highest card value
  const totalWinnings = calculateHandRank(handData)
  return totalWinnings
}

export const getCardValue = (hand: string): CardsAndCount => {
  const sortedCards = hand.split('').sort()
  const cardCounts: Record<string, number> = sortedCards.reduce((acc, curr) => {
    acc[curr] = acc[curr] ? acc[curr] + 1 : 1
    return acc
  }, {} as Record<string, number>)
  return Object.entries(cardCounts)
}

export const evaluateHand = (cards: CardsAndCount) => {
  switch (cards.length) {
    case 1:
      // Five of a kind
      return HandType.FiveOfAKind
    case 2:
      // Four of a kind or Full house
      return cards.some(([_, count]) => count === 4)
        ? HandType.FourOfAKind
        : HandType.FullHouse
    case 3:
      // Three of a kind or Two pair
      return cards.some(([_, count]) => count === 3)
        ? HandType.ThreeOfAKind
        : HandType.TwoPair
    case 4:
      // One pair
      return HandType.OnePair
    case 5:
    default:
      // High card
      return HandType.HighCard
  }
}

export const calculateHandRank = (hands: RankData[]) => {
  const sorted = hands.sort((a, b) => {
    return a.handType - b.handType === 0
      ? calculateCardRank(a.hand, b.hand)
      : a.handType - b.handType
  })
  return sorted.reduce((acc, curr, index) => {
    acc += curr.bid * (index + 1)
    return acc
  }, 0)
}

const calculateCardRank = (cardA: string, cardB: string) => {
  let i = 0
  while (i < cardA.length && i < cardB.length) {
    const cardValues = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'T',
      'J',
      'Q',
      'K',
      'A',
    ]
    const temp = cardValues.indexOf(cardA[i]) - cardValues.indexOf(cardB[i])
    if (temp === 0) {
      i += 1
    } else {
      return temp
    }
  }
  return 0
}
