const soldier = {
  type: 'object',
  required: ['id', 'name', 'degree', 'limitations'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    degree: { type: 'string' },
    limitations: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  additionalProperties: false,
};

export default soldier;
