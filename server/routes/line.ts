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

const { lineChannelAccessToken, lineChannelSecret } = useRuntimeConfig().public

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

          // Return an error message.
          // return res.status(500).json({
          //   status: 'error'
          // })
          return
        }
      })
    )

    // Return a successfull message.
    // return res.status(200).json({
    //   status: 'success',
    //   results
    // })
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

    // TODO: 備份使用者頭像，存至 attender collection，要有創建時間、更新時間(用於設計一定期間更新參加者頭像)
    console.log('line nickname', displayName, pictureUrl)
    // Process all message related variables here.
    const { replyToken } = event
    const { text } = event.message

    // Create a new message.
    // const response: TextMessage = {
    //   type: 'text',
    //   text
    // }
    const message: TextMessage = {
      type: 'text',
      text: `https://a710-2001-b011-2016-3d40-2dea-a5fc-47b-85f5.ngrok-free.app/check-in/${userId}-${displayName}`
    }


    // Reply to the user.
    await client.replyMessage(replyToken, message)
  }
}