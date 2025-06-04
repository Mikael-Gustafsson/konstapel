import { describe, it, expect } from 'vitest';
import { shuffleArray } from '../App.jsx';

describe('shuffleArray', () => {
  it('returns a permutation of the input array and has the same length', () => {
    const input = [1, 2, 3, 4, 5];
    const output = shuffleArray(input);
    expect(output).toHaveLength(input.length);
    expect(output.sort()).toEqual([...input].sort());
  });
});
