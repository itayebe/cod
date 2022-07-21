import { describe, it, expect } from 'vitest';
import app from '../src/app.js';

describe('health route', () => {
  describe('get health', () => {
    it('should return 200', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });

      expect(response.statusCode).toBe(200);
    });
  });
});
