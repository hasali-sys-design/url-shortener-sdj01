
module.exports = {
  apps: [{
    name: 'url-shortener',
    script: 'build/index.js',
    instances: 'max',       // Scales to all CPU cores
    exec_mode: 'cluster',    // Enables cluster mode
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      DATABASE_URL:'postgresql://[postgres[:pg1016]@]localhost[:5433][/urldb]]',
      REDIS_URL: 'redis://localhost:6379',
      ORIGIN: 'http://localhost:3000' // Required for production
    }
  }]
};