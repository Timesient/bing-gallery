module.exports = {
  name: "bing",
  script: "entry.js",
  env_production: {
    NODE_ENV_NOW: "production"
  },
  env_development: {
    NODE_ENV_NOW: "development"
  }
}