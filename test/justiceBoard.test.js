import {
  describe, it, expect, beforeAll,
} from 'vitest';
import app from '../src/app.js';
import beforeJusticeBoardTest from '../beforeTest/beforeJusticeBoardTest.js';

describe('justice-board route', () => {
  beforeAll(async () => { await beforeJusticeBoardTest(); });
  describe('get justice-board', () => {
    it('should return the justice-board', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/justice-board',
      });

      expect(response.json()).toEqual([
        {
          id: 'id1',
          score: 21,
        }, {
          id: 'id2',
          score: 3,
        }, {
          id: 'id3',
          score: 4,
        },
      ]);
      expect(response.statusCode).toBe(200);
    });
  });
});
