import { getPuzzleInput } from '../utils'
import {
  CardsAndCount,
  HandType,
  RankData,
  calculateHandRank,
  evaluateHand,
  getCardValue,
  part1,
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
})
