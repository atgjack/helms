var rollup =  require('rollup');
var babel  = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

var pkg = require('./package.json');
var externals = Object.keys(pkg.dependencies || {});

const babelConfig = {
  babelrc: false,
  presets: [
    ["es2015", { modules: false }],
    "stage-0"
  ]
}

rollup.rollup({
  entry: 'lib/index.js',
  external: externals,
  plugins: [ babel(babelConfig) ]
}).then( function(bundle) {
  bundle.write({
    format: 'es',
    sourceMap: true,
    dest: pkg['jsnext:main']
  });
}).catch( function(err) { console.log(err) });

rollup.rollup({
  entry: 'lib/index.js',
  external: externals,
  plugins: [ babel(babelConfig), uglify() ],
}).then( function(bundle) {
  bundle.write({
    format: 'umd',
    moduleName: 'helms',
    sourceMap: true,
    dest: pkg['main']
  });
}).catch( function(err) { console.log(err) });
