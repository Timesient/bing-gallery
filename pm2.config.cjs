module.exports = {
  name: "bing-gallery",
  script: "entry.js",
  env_production: {
    NODE_ENV_NOW: "production"
  },
  env_development: {
    NODE_ENV_NOW: "development"
  }
}