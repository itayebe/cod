import {
  describe, it, expect, beforeAll,
} from 'vitest';
import app from '../src/app.js';
import beforeSoldiersTest from '../beforeTest/beforeSoldiersTest.js';

describe('soldiers route', () => {
  beforeAll(async () => { await beforeSoldiersTest(); });
  describe('post soldiers', () => {
    it('should create a soldier and return 201', async () => {
      const soldier = {
        id: 'id',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
      };
      const response = await app.inject({
        method: 'POST',
        url: '/soldiers',
        payload: soldier,
      });

      expect(response.json()).toEqual({
        _id: 'id',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
        duties: [],
      });
      expect(response.statusCode).toBe(201);
    });

    it('should return 500 duplicate id', async () => {
      const soldier = {
        id: 'duplicateId',
        name: 'name',
        degree: 'degree',
        limitations: ['l3', 'l4'],
      };
      const response = await app.inject({
        method: 'POST',
        url: '/soldiers',
        payload: soldier,
      });

      expect(response.json().message).toBe('E11000 duplicate key error collection: cod-db.soldiers index: _id_ dup key: { _id: "duplicateId" }');
      expect(response.statusCode).toBe(500);
    });
  });

  describe('get soldiers', () => {
    it('should return all soldiers that fit the query as an array', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/soldiers?name=name',
      });

      expect(response.json()).toEqual([{
        _id: 'duplicateId',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
        duties: [],
      }, {
        _id: 'id',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
        duties: [],
      }]);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('get soldiers', () => {
    it('should return the soldier with the id', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/soldiers/id',
      });

      expect(response.json()).toEqual({
        _id: 'id',
        name: 'name',
        degree: 'degree',
        limitations: ['l1', 'l2'],
        duties: [],
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
