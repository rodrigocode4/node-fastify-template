const ajvConfigOpts = {
  ajv: {
    plugins: [
      [require('ajv-formats')]
    ],
  },
}

export default {
  ajvConfigOpts,
}
