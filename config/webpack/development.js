process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

// Get the existing config
const config = environment.toWebpackConfig()

// Remove the old node configuration that's causing the error
if (config.node) {
  delete config.node.dgram
  delete config.node.fs
  delete config.node.net
  delete config.node.tls
  delete config.node.child_process
  
  // If the node object is now empty, remove it entirely
  if (Object.keys(config.node).length === 0) {
    delete config.node
  }
}

// Add the new resolve.fallback configuration
config.resolve = config.resolve || {}
config.resolve.fallback = {
  ...config.resolve.fallback,
  fs: false,
  net: false,
  tls: false,
  dgram: false,
  child_process: false
}

// Exclude node_modules from babel-loader processing
if (config.module && config.module.rules) {
  config.module.rules.forEach(rule => {
    if (rule.use) {
      const babelLoader = rule.use.find(use => 
        use.loader && use.loader.includes('babel-loader')
      );
      if (babelLoader) {
        // Ensure node_modules are excluded
        rule.exclude = /node_modules/;
      }
    }
  });
}

module.exports = config