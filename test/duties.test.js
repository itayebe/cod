import {
  describe, it, expect, beforeAll,
} from 'vitest';
import app from '../src/app.js';
import beforeDutiesTest from '../beforeTest/beforeDutiesTest.js';

describe('duties route', () => {
  beforeAll(async () => { await beforeDutiesTest(); });
  describe('post duties', () => {
    it('should create a duty and return 201', async () => {
      const duty = {
        name: 'name',
        location: 'location',
        time: {
          start: 'start',
          end: 'end',
        },
        constraints: ['c1', 'c2'],
        soldiersRequired: 1,
        value: 2,
      };
      const response = await app.inject({
        method: 'POST',
        url: '/duties',
        payload: duty,
      });

      expect(response.json()).toMatchObject({
        name: 'name',
        location: 'location',
        time: {
          start: 'start',
          end: 'end',
        },
        constraints: ['c1', 'c2'],
        soldiersRequired: 1,
        value: 2,
        soldiers: [],
      });
      expect(response.json()).toHaveProperty('_id');
      expect(response.statusCode).toBe(201);
    });
  });

  describe('get duties', () => {
    it('should return all duties that fit the query as an array', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/duties?name=name',
      });

      expect(response.json()).toMatchObject([{
        name: 'name',
        location: 'location',
        time: {
          start: 'start',
          end: 'end',
        },
        constraints: ['c1', 'c2'],
        soldiersRequired: 1,
        value: 2,
        soldiers: [],
      }]);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('get duty', () => {
    it('should return the duty with the id', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/duties/62e29583af47a9b7a8e839d6',
      });

      expect(response.json()).toEqual({
        _id: '62e29583af47a9b7a8e839d6',
        name: 'name1',
        location: 'location',
        time: {
          start: 'start',
          end: 'end',
        },
        constraints: ['c1', 'c2'],
        soldiersRequired: 1,
        value: 2,
        soldiers: [],
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('delete duty', () => {
    it('should delete the duty with the id', async () => {
      const response = await app.inject({
        method: 'DELETE',
        url: '/duties/62e29583af47a9b7a8e839d6',
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe('update duty', () => {
    it('should update the duty with the id and return the updated duty', async () => {
      const duty = {
        name: 'newName',
        soldiersRequired: 3,
      };
      const response = await app.inject({
        method: 'PATCH',
        url: '/duties/62e62b7f21409be8ad77db00',
        payload: duty,
      });

      expect(response.json()).toEqual({
        _id: '62e62b7f21409be8ad77db00',
        name: 'newName',
        location: 'location2',
        time: {
          start: 'start',
          end: 'end',
        },
        constraints: ['c1', 'c2'],
        soldiersRequired: 3,
        value: 2,
        soldiers: [],
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
