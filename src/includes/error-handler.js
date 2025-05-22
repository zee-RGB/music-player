export default {
  install(app) {
    app.config.errorHandler = (error, instance, info) => {
      // Log to your error tracking service
      console.error('Global error:', error)
      console.error('Vue instance:', instance)
      console.error('Error info:', info)
    }

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
    })
  },
}
