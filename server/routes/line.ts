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
    const { userId, displayName, pictureUrl } = (await client.getProfile(lineUserId))

    // Process all message related variables here.
    const { replyToken } = event
    const { text } = event.message

    // Create a new message.
    const message: TextMessage = {
      type: 'text',
      text: `${HOST_URL}/check-in/${userId}-${displayName}`
    }


    // Reply to the user.
    await client.replyMessage(replyToken, message)
  }
}