import { ServiceContext } from '@vtex/api'

import parse = require('co-body')

export async function onSpecComplete(ctx: ServiceContext, next: () => Promise<any>) {
  const {
    vtex: {
      logger,
      route: {
        params: { spec },
      },
    },
  } = ctx

  const specReport = await parse.json(ctx.req) as SpecReport

  const testsByState: { [state: string]: string[] } = {}
  if (specReport.report?.tests) {
    specReport.report.tests.forEach(t => {
      testsByState[t.state] = (testsByState[t.state] ?? []).concat(t.title.join(''))
    })
  }
  logger.info({
    spec,
    state: specReport.state,
    testsByState,
  })

  ctx.status = 200

  await next()
}

export async function onTestComplete(ctx: ServiceContext, next: () => Promise<any>) {
  const {
    vtex: {
      logger,
      route: {
        params: { testId },
      },
    },
  } = ctx
  const app = await parse.json(ctx.req) as AppReport

  const specsByState: { [state: string]: string[] } = {}
  Object.entries(app).forEach(([spec, report]) => {
    specsByState[report.state] = (specsByState[report.state] ?? []).concat(spec)
  })

  logger.info({
    specsByState,
    testId,
  })

  ctx.status = 200

  await next()
}

