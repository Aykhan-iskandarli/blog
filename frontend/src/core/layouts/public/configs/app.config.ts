enum environment {
    // @ts-ignore
    env = process.env.NODE_ENV,
    // @ts-ignore
    applicationUrl = process.env.BASE_URL,
    // @ts-ignore
    applicationName = process.env.NEXT_APP_TITLE,
    // @ts-ignore
    apiMain = process.env.NEXT_APP_API_MAIN,
    // @ts-ignore
    apiTEST = process.env.NEXT_APP_API_TEST,
    // @ts-ignore
    dev = process.env.dev,

    applicationVersion = require('../../../../../package.json').version,
}

export default environment;


