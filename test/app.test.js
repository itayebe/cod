import app from '../src/app.js';
import {describe,it,expect} from 'vitest';

describe('health route', () => {
  describe('get health route', () => {
    it('should return 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
    });
  });
});
