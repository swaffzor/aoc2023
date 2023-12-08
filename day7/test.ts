import { getPuzzleInput } from '../utils'
import {
  CardsAndCount,
  HandType,
  RankData,
  calculateHandRank,
  evaluateHand,
  getCardValue,
  getSomeRank,
  part1,
  part2,
} from './solution'

describe('day 7', () => {
  describe('part 1', () => {
    it('solution', () => {
      expect(part1(getPuzzleInput('day7/sampleInput'))).toEqual(6440)
      console.log('part1', part1(getPuzzleInput('day7/input')))
    })
    // 32T3K
    // T55J5
    // KK677
    // KTJJT
    // QQQJA
    describe('getCardValue', () => {
      it('32T3K', () => {
        expect(getCardValue('32T3K')).toEqual([
          ['2', 1],
          ['3', 2],
          ['K', 1],
          ['T', 1],
        ])
      })
      it('T55J5', () => {
        expect(getCardValue('T55J5')).toEqual([
          ['5', 3],
          ['J', 1],
          ['T', 1],
        ])
      })
      it('KK677', () => {
        expect(getCardValue('KK677')).toEqual([
          ['6', 1],
          ['7', 2],
          ['K', 2],
        ])
      })
      it('KTJJT', () => {
        expect(getCardValue('KTJJT')).toEqual([
          ['J', 2],
          ['K', 1],
          ['T', 2],
        ])
      })
      it('QQQJA', () => {
        expect(getCardValue('QQQJA')).toEqual([
          ['A', 1],
          ['J', 1],
          ['Q', 3],
        ])
      })
    })

    describe('evaluateHand', () => {
      it('32T3K', () => {
        const input = [
          ['2', 1],
          ['3', 2],
          ['K', 1],
          ['T', 1],
        ] as CardsAndCount
        expect(evaluateHand(input)).toEqual(HandType.OnePair)
      })
      it('T55J5', () => {
        const input = [
          ['5', 3],
          ['J', 1],
          ['T', 1],
        ] as CardsAndCount
        expect(evaluateHand(input)).toEqual(HandType.ThreeOfAKind)
      })
      it('KK677', () => {
        const input = [
          ['6', 1],
          ['7', 2],
          ['K', 2],
        ] as CardsAndCount
        expect(evaluateHand(input)).toEqual(HandType.TwoPair)
      })
      it('KTJJT', () => {
        const input = [
          ['J', 2],
          ['K', 1],
          ['T', 2],
        ] as CardsAndCount
        expect(evaluateHand(input)).toEqual(HandType.TwoPair)
      })
      it('QQQJA', () => {
        const input = [
          ['A', 1],
          ['J', 1],
          ['Q', 3],
        ] as CardsAndCount
        expect(evaluateHand(input)).toEqual(HandType.ThreeOfAKind)
      })
    })

    it('calculateHandRank', () => {
      const input: RankData[] = [
        {
          hand: '32T3K',
          bid: 765,
          handType: 1,
          cards: [
            ['2', 1],
            ['3', 2],
            ['K', 1],
            ['T', 1],
          ],
        },
        {
          hand: 'KK677',
          bid: 28,
          handType: 2,
          cards: [
            ['6', 1],
            ['7', 2],
            ['K', 2],
          ],
        },
        {
          hand: 'KTJJT',
          bid: 220,
          handType: 2,
          cards: [
            ['J', 2],
            ['K', 1],
            ['T', 2],
          ],
        },
        {
          hand: 'T55J5',
          bid: 684,
          handType: 3,
          cards: [
            ['5', 3],
            ['J', 1],
            ['T', 1],
          ],
        },
        {
          hand: 'QQQJA',
          bid: 483,
          handType: 3,
          cards: [
            ['A', 1],
            ['J', 1],
            ['Q', 3],
          ],
        },
      ]
      expect(calculateHandRank(input)).toEqual(6440)
    })
  })

  describe('part 2', () => {
    it('solution', () => {
      expect(part2(getPuzzleInput('day7/sampleInput'))).toEqual(5905)
      console.log('part2', part2(getPuzzleInput('day7/input')))
    })

    describe('calculateHandRank', () => {
      it('32T3K', () => {
        const input = [
          ['2', 1],
          ['3', 2],
          ['K', 1],
          ['T', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.OnePair)
      })
      it('T55J5', () => {
        const input = [
          ['5', 3],
          ['J', 1],
          ['T', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('KK677', () => {
        const input = [
          ['6', 1],
          ['7', 2],
          ['K', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.TwoPair)
      })
      it('KTJJT', () => {
        const input = [
          ['J', 2],
          ['K', 1],
          ['T', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('QQQJA', () => {
        const input = [
          ['A', 1],
          ['J', 1],
          ['Q', 3],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('QAQJA', () => {
        const input = [
          ['A', 2],
          ['J', 1],
          ['Q', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FullHouse)
      })
      it('JJJJJ', () => {
        const input = [['J', 5]] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FiveOfAKind)
      })
      it('3322J', () => {
        const input = [
          ['3', 2],
          ['2', 2],
          ['J', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FullHouse)
      })
    })
    describe('evaluateHand', () => {
      it('32T3K', () => {
        const input = [
          ['2', 1],
          ['3', 2],
          ['K', 1],
          ['T', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.OnePair)
      })
      it('T55J5', () => {
        const input = [
          ['5', 3],
          ['J', 1],
          ['T', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('KK677', () => {
        const input = [
          ['6', 1],
          ['7', 2],
          ['K', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.TwoPair)
      })
      it('KTJJT', () => {
        const input = [
          ['J', 2],
          ['K', 1],
          ['T', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('QQQJA', () => {
        const input = [
          ['A', 1],
          ['J', 1],
          ['Q', 3],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      // TTTTT 1 // 5 of a kind, natural
      // JTTTT 1 // 5 of a kind, wild
      // JJTTT 1 // 5 of a kind, wild
      // JJJTT 1 // 5 of a kind, wild
      // JJJJT 1 // 5 of a kind, wild
      // JJJJJ 1 // 5 of a kind, wild

      // 2TTTT 1 // 4 of a kind, natural
      // 2JTTT 1 // 4 of a kind, wild
      // 2JJTT 1 // 4 of a kind, wild
      // 2JJJT 1 // 4 of a kind, wild
      // 22TTT 1 // full house, natural
      // 22JTT 1 // full house, wild
      // 23TTT 1 // 3 of a kind, natural
      // 23JTT 1 // 3 of a kind, wild

      // 23JJT 1 // 3 of a kind, wild
      // 223TT 1 // 2 pair, natural
      // 234TT 1 // pair, natural
      // 234JT 1 // pair, wild
      // 2345T 1 // high card, natural
      it('TTTTT', () => {
        const input = [['T', 5]] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FiveOfAKind)
      })
      it('JTTTT', () => {
        const input = [
          ['T', 4],
          ['J', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FiveOfAKind)
      })
      it('JJTTT', () => {
        const input = [
          ['T', 3],
          ['J', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FiveOfAKind)
      })
      it('JJJTT', () => {
        const input = [
          ['T', 2],
          ['J', 3],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FiveOfAKind)
      })
      it('JJJJT', () => {
        const input = [
          ['T', 1],
          ['J', 4],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FiveOfAKind)
      })
      it('2TTTT', () => {
        const input = [
          ['T', 4],
          ['2', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('2JTTT', () => {
        const input = [
          ['T', 3],
          ['J', 1],
          ['2', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('2JJTT', () => {
        const input = [
          ['T', 2],
          ['J', 2],
          ['2', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('2JJJT', () => {
        const input = [
          ['T', 1],
          ['J', 3],
          ['2', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FourOfAKind)
      })
      it('22TTT', () => {
        const input = [
          ['T', 3],
          ['2', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FullHouse)
      })
      it('22JTT', () => {
        const input = [
          ['T', 2],
          ['J', 1],
          ['2', 2],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.FullHouse)
      })
      it('23TTT', () => {
        const input = [
          ['T', 3],
          ['2', 1],
          ['3', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.ThreeOfAKind)
      })
      it('23JTT', () => {
        const input = [
          ['T', 2],
          ['J', 1],
          ['2', 1],
          ['3', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.ThreeOfAKind)
      })
      it('23JJT', () => {
        const input = [
          ['T', 1],
          ['J', 2],
          ['2', 1],
          ['3', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.ThreeOfAKind)
      })
      it('223TT', () => {
        const input = [
          ['T', 2],
          ['2', 2],
          ['3', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.TwoPair)
      })
      it('234TT', () => {
        const input = [
          ['T', 2],
          ['2', 1],
          ['3', 1],
          ['4', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.OnePair)
      })
      it('234JT', () => {
        const input = [
          ['T', 1],
          ['J', 1],
          ['2', 1],
          ['3', 1],
          ['4', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.OnePair)
      })
      it('2345T', () => {
        const input = [
          ['T', 1],
          ['2', 1],
          ['3', 1],
          ['4', 1],
          ['5', 1],
        ] as CardsAndCount
        expect(evaluateHand(input, 2)).toEqual(HandType.HighCard)
      })
    })

    it('calculateCardRank', () => {
      const input = [
        {
          hand: '32T3K',
          bid: 765,
          handType: 1,
          cards: [
            ['2', 1],
            ['3', 2],
            ['K', 1],
            ['T', 1],
          ],
        },
        {
          hand: 'KK677',
          bid: 28,
          handType: 2,
          cards: [
            ['6', 1],
            ['7', 2],
            ['K', 2],
          ],
        },
        {
          hand: 'KTJJT',
          bid: 220,
          handType: 2,
          cards: [
            ['J', 2],
            ['K', 1],
            ['T', 2],
          ],
        },
        {
          hand: 'T55J5',
          bid: 684,
          handType: 3,
          cards: [
            ['5', 3],
            ['J', 1],
            ['T', 1],
          ],
        },
        {
          hand: 'QQQJA',
          bid: 483,
          handType: 3,
          cards: [
            ['A', 1],
            ['J', 1],
            ['Q', 3],
          ],
        },
      ] as any
      expect(calculateHandRank(input, 2)).toEqual(5905)
    })

    it('getSomeRank', () => {
      const input = [
        {
          hand: '32T3K',
          bid: 765,
          handType: 1,
          cards: [
            ['2', 1],
            ['3', 2],
            ['K', 1],
            ['T', 1],
          ],
        },
        {
          hand: 'KK677',
          bid: 28,
          handType: 2,
          cards: [
            ['6', 1],
            ['7', 2],
            ['K', 2],
          ],
        },
        {
          hand: 'KTJJT',
          bid: 220,
          handType: 2,
          cards: [
            ['J', 2],
            ['K', 1],
            ['T', 2],
          ],
        },
        {
          hand: 'T55J5',
          bid: 684,
          handType: 3,
          cards: [
            ['5', 3],
            ['J', 1],
            ['T', 1],
          ],
        },
        {
          hand: 'QQQJA',
          bid: 483,
          handType: 3,
          cards: [
            ['A', 1],
            ['J', 1],
            ['Q', 3],
          ],
        },
      ] as any
      expect(getSomeRank(input)).toEqual([1, 2, 3, 4, 5])
    })
  })
})
