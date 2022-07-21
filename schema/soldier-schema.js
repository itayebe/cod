const soldier = {
  body: {
    type: 'object',
    required: ['id', 'name', 'degree', 'limitations'],
    properties: {
      id: { type: 'string' }, // _id will hold the soldier's unique identifier
      name: { type: 'string' },
      degree: { type: 'string' },
      limitations: {
        type: 'array',
        items: { type: 'string' },
      },
    },
    additionalProperties: false,
  },
};

export default soldier;
