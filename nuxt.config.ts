// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    https: {
      key: 'localhost-key.pem',
      cert: 'localhost.pem'
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      HOST_URL: process.env.HOST_URL,
      googleApiKey: process.env.GOOGLE_API_KEY,
      mongodbUri: process.env.MONGODB_URI,
      mongodbAltlasUri: process.env.MONGODB_ALTLAS_URI,
      lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
      lineChannelSecret: process.env.LINE_CHANNEL_SECRET,
      lineAvatarUrl: process.env.LINE_AVATAR_URL
    }
  },
  nitro: {
    plugins: ['@/server/index.ts']
  }
})
