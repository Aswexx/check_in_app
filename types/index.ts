export {  }

declare global {
	interface PartyData {
    _id: string
    title: string
    date: Date | string
    earliestCheckable: number
    latestCheckable: number
    address: string
    location: {
      lat: number
      lng: number
    }
    expectedAttenders: string[] | []
    actualAttenders: Attender[]
  }

	interface Attender {
    lineUserId: string
    lineName: string
    avatarUrl: string
    checkAt: Date | string
  }

  interface Toast {
    content: string
    type: string
  }
}

