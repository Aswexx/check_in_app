import {
  ClientConfig,
  Client,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
  TextMessage,
  LocationMessage,
  TemplateMessage,
  MessageAPIResponseBase
} from '@line/bot-sdk'

const { lineChannelAccessToken, lineChannelSecret, HOST_URL } = useRuntimeConfig().public

const clientConfig: ClientConfig = {
  channelAccessToken: lineChannelAccessToken || '',
  channelSecret: lineChannelSecret
}

const client = new Client(clientConfig)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const events: WebhookEvent[] = body.events
  console.log(events)

      // Process all of the received events asynchronously.
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await textEventHandler(event)
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err)
          }

          return
        }
      })
    )

    return 'ok'
  }
)

// Function handler to receive the text.
const textEventHandler = async (
  event: WebhookEvent
): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== 'message' || event.source.type !== 'user') {
    return
  }

  if (event.message.type === 'text' && event.message.text === '簽到') {
    const lineUserId = event.source.userId
    const { userId, displayName, pictureUrl } = await client.getProfile(
      lineUserId
    )
    // 從字串的結尾向前尋找第一個斜線 /，匹配斜線後面的所有非斜線字符
    const regex = /\/([^\/]+)$/
    console.log('@@', pictureUrl)
    console.log('@@', regex.exec(pictureUrl)![1])

    const linAvatarId = regex.exec(pictureUrl)![1]


    // Process all message related variables here.
    const { replyToken } = event
    const { text } = event.message

    // Create a new message.
    const message: TextMessage = {
      type: 'text',
      text: `${HOST_URL}/check-in/${userId}-${displayName}-${linAvatarId}`
    }

    // Reply to the user.
    await client.replyMessage(replyToken, message)
  }
}