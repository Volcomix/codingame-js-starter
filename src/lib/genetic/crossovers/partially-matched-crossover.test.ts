import { PartiallyMatchedCrossover } from './partially-matched-crossover'

describe('PartiallyMatchedCrossover', () => {
  describe('crossover', () => {
    let partiallyMatchedCrossover: PartiallyMatchedCrossover
    let a: number[]
    let b: number[]

    beforeEach(() => {
      partiallyMatchedCrossover = new PartiallyMatchedCrossover(1)
      a = [8, 4, 7, 3, 6, 2, 5, 1, 9, 0]
      b = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    })

    it('alters both chromosomes', () => {
      Math.random = jest
        .fn()
        .mockReturnValueOnce(0.3)
        .mockReturnValue(0.8)

      partiallyMatchedCrossover.crossover(a, b)
      expect(a).toEqual([8, 2, 1, 3, 4, 5, 6, 7, 9, 0])
      expect(b).toEqual([0, 7, 4, 3, 6, 2, 5, 1, 8, 9])
      expect(Math.random).toHaveBeenCalledTimes(2)
    })

    it('swaps the first gene', () => {
      Math.random = jest
        .fn()
        .mockReturnValueOnce(0)
        .mockReturnValue(0.1)

      partiallyMatchedCrossover.crossover(a, b)
      expect(a).toEqual([0, 4, 7, 3, 6, 2, 5, 1, 9, 8])
      expect(b).toEqual([8, 1, 2, 3, 4, 5, 6, 7, 0, 9])
      expect(Math.random).toHaveBeenCalledTimes(2)
    })

    it('swaps genes with overlapping crossover points', () => {
      Math.random = jest.fn(() => 0.2)

      partiallyMatchedCrossover.crossover(a, b)
      expect(a).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      expect(b).toEqual([8, 4, 7, 3, 6, 2, 5, 1, 9, 0])
      expect(Math.random).toHaveBeenCalledTimes(2)
    })
  })
})
