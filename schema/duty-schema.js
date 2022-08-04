const duty = {
  type: 'object',
  required: ['name', 'location', 'time', 'constraints', 'soldiersRequired', 'value'],
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    time: {
      type: 'object',
      properties: {
        start: { type: 'string' },
        end: { type: 'string' },
      },
    },
    constraints: {
      type: 'array',
      items: { type: 'string' },
    },
    soldiersRequired: { type: 'number' },
    value: { type: 'number' },
  },
  additionalProperties: false,
};

export default duty;
