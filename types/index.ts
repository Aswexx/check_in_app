export {  }

declare global {
	interface PartyData {
    _id: string
    title: string
    date: Date | string
    address: string
    location: {
      lat: number
      lng: number
    }
    expectedAttenders: string[] | []
    actualAttenders: Attender[] | []
  }

	interface Attender {
    lineUserId: string
    lineName: string
    avatarUrl: string
    checkAt: Date
  }
}

