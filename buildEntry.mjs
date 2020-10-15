import buildEntry from '@webformula/pax-core/src/buildEntry.js';

buildEntry({
  rootFolder: 'app',
  pagesFolder: 'pages',
  // templateFile: true,
  routerConfig: {
    root: 'login'
  }
});
