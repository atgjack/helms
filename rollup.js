var rollup =  require('rollup');
var babel  = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

const babelConfig = {
  babelrc: false,
  presets: [
    ["es2015", { modules: false }],
    "stage-0"
  ],
  plugins: [ "external-helpers" ]
}

rollup.rollup({
  entry: 'lib/index.js',
  plugins: [ babel(babelConfig) ],
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
  plugins: [ babel(babelConfig), uglify() ],
}).then( function(bundle) {
  bundle.write({
    format: 'umd',
    moduleName: 'helms',
    dest: 'dist/lib.min.js'
  });
}).catch( function(err) { console.log(err) });
