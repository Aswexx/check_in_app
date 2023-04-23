import { middleware, MiddlewareConfig } from '@line/bot-sdk'

const { lineChannelAccessToken, lineChannelSecret } = useRuntimeConfig().public

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: lineChannelAccessToken,
  channelSecret: lineChannelSecret || ''
}


export default defineEventHandler(async (event) => {
  if (event.node.req.url === '/line' && event.node.req.method === 'POST') {
    console.log(
      'New request: ' + event.node.req.method + ' ' + event.node.req.url
    )

    middleware(middlewareConfig)
  }
})
