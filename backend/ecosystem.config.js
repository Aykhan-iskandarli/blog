module.exports = {
  apps : [{
    name   : "Menim FL im",
    script : "server.js",
    env_production: {
       NODE_ENV: "production",
       API: 'localhost:5000',
       PORT: 5000
    },
    env_development: {
       NODE_ENV: "development",
       API: 'localhost:5000',
       PORT: 5000
    }
  },
]
};
