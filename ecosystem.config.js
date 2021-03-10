module.exports = {
    apps : [
        {
            name: `${process.env.ENVIRONMENT}-e-pharm-backend`,
            script: "./server.js",
            watch: false,
            env: {
                PORT: `${process.env.PORT}`,
                MONGODB_URL: `${process.env.MONGODB_URL}`,
                MAILGUN_DOMAIN: `${process.env.MAILGUN_DOMAIN}`,
                MAILGUN_API_KEY: `${process.env.MAILGUN_API_KEY}`,
                CONTACT_US_TO_EMAIL: `${process.env.CONTACT_US_TO_EMAIL}`,
                CONTACT_US_FROM: `${process.env.CONTACT_US_FROM}`
            },
        }
    ]
  }