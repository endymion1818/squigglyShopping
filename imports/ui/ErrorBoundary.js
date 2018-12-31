import React from "react"
import * as Sentry from "@sentry/browser"

Sentry.init({
  dsn: "https://778f377fdee34a5785a72f31e9f9c26d@sentry.io/1362433"
})

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <main>
          <h1>Oops, Something went wrong.</h1>
          <h2>Sorry about that.</h2>
          <p>I've already been alerted to the problem.</p>
        </main>
      )
    }

    return this.props.children
  }
}
