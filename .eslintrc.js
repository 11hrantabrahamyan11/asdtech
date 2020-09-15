module.exports = {
  root: true,
  extends: 'react-app',
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
