const schema = {
  description: 'Error Handler',
  type: 'object',
  properties: {
    data: {
      type: 'null',
      default: null,
    },
    errors: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}

export default (codes = [400, 500]) => codes.reduce((acc, crr) => ({ ...acc, [crr]: schema }), {})
