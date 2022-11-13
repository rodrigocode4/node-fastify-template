import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }],
})

prisma.$use(async (params, next) => {
  const result = await next(params)

  if (result === null) return result

  const notHasBeAction = !['create', 'find', 'update'].find((e) => params.action.includes(e))

  if (notHasBeAction) return result

  if (Array.isArray(result)) {
    return result.map((model) => ({
      ...model,
      createdAt: (model.createdAt as Date).toISOString(),
      updatedAt: (model.updatedAt as Date).toISOString(),
    }))
  }

  return {
    ...result,
    createdAt: (result.createdAt as Date).toISOString(),
    updatedAt: (result.updatedAt as Date).toISOString(),
  }
})

export default prisma
