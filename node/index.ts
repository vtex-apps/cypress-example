import { Service } from '@vtex/api'

import { onSpecComplete, onTestComplete } from './middlewares/e2e'

export default new Service({
  routes: {
    onSpecComplete,
    onTestComplete,
  },
})
