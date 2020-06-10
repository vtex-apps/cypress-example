declare global {
  interface SpecReport {
    state: 'enqueued' | 'running' | 'passed' | 'failed' | 'skipped' | 'error'
    error?: string
    report?: {
      stats: {
        suites: number
        tests: number
        passes: number
        pending: number
        skipped: number
        failures: number
      }
      tests: Array<{
        title: string[]
        state: string
        body: string
        stack?: string
        error?: string
      }>
    }
    logId?: string
    specId?: string
    lastUpdate: number
  }

  interface AppReport {
    [spec: string]: SpecReport
  }
}

export {}
