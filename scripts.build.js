const { frontendCompiler } = require('@rockpack/compiler');
const path = require('path');

frontendCompiler({
  html: {
    favicon: path.resolve(__dirname, './favicon.ico'),
    template: path.resolve(__dirname, './index.ejs'),
  },
  styles: 'styles.css',
  vendor: ['react', 'react-dom'],
});
