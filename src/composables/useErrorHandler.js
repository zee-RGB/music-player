import { ref } from 'vue'

export function useErrorHandler() {
  const error = ref(null)
  const loading = ref(false)

  const handleError = (e) => {
    console.error(e)
    error.value = e.message || 'An unexpected error occurred'
    loading.value = false
  }

  const clearError = () => {
    error.value = null
  }

  return {
    error,
    loading,
    handleError,
    clearError,
  }
}
