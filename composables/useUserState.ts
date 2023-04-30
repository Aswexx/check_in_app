export default function useUserState() {
	const isMobile = useState('isMobile', () => false)

	onMounted(() => {
		const deviceInfo = navigator.userAgent
		const devices = [
			/Android/i,
			/webOS/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i
		]
		for (const device of devices) {
			if (device.exec(deviceInfo)) return isMobile.value = true
		}

		isMobile.value = false
	})

	return { isMobile }
}
