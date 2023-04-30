export default function useToast() {
	const toast = useState('toast', () => {
		return {
      activate: false,
      content: '',
      type: ''
    }
	})

	function triggerToast(type: string, content: string) {
    toast.value.activate = true
    toast.value.type = type
    toast.value.content = content
  }

	return { toast, triggerToast }
}