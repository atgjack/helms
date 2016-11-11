var rollup =  require('rollup');
var babel  = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');


rollup.rollup({
  entry: 'lib/index.js',
  plugins: [ babel() ],
}).then( function(bundle) {
  bundle.write({
    format: 'es',
    dest: 'dist/lib.es6.js'
  });
  bundle.write({
    format: 'umd',
    moduleName: 'helms',
    dest: 'dist/lib.js'
  });
}).catch( function(err) { console.log(err) });

rollup.rollup({
  entry: 'lib/index.js',
  plugins: [ babel(), uglify() ],
}).then( function(bundle) {
  bundle.write({
    format: 'umd',
    moduleName: 'helms',
    dest: 'dist/lib.min.js'
  });
}).catch( function(err) { console.log(err) });
