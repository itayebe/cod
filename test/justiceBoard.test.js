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

  describe('schedule duty', () => {
    it('should add the duty to the duties of the soldier and the soldier to the the soldiers of the duty', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/duties/62e62b7f21409be8ad77db05/schedule',
      });

      const duty = await app.inject({
        method: 'GET',
        url: '/duties/62e62b7f21409be8ad77db05',
      });

      expect(duty.json()).toEqual({
        _id: '62e62b7f21409be8ad77db05',
        name: 'name5',
        location: 'location',
        time: {
          start: 'start',
          end: 'end',
        },
        constraints: ['c1', 'c2'],
        soldiersRequired: 2,
        value: 2,
        soldiers: ['id2', 'id3'],
      });

      const soldier1 = await app.inject({
        method: 'GET',
        url: '/soldiers/id2',
      });

      expect(soldier1.json()).toEqual({
        _id: 'id2',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
        duties: ['62e29583af47a9b7a8e839d3', '62e62b7f21409be8ad77db05'],
      });

      const soldier2 = await app.inject({
        method: 'GET',
        url: '/soldiers/id3',
      });

      expect(soldier2.json()).toEqual({
        _id: 'id3',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
        duties: ['62e62b7f21409be8ad77db04', '62e62b7f21409be8ad77db05'],
      });

      expect(response.statusCode).toBe(200);
    }, 10000);
  });
});
