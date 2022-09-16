export interface ServiceResult<T> {
  errors?: string[],
  data?: T,
}

export const createServiceResult = <T>(errors?: string[], data?: T): ServiceResult<T> => ({
  errors,
  data,
})

export const createErrorServiceResult = <T>(
  ...message: string[]): ServiceResult<T> => createServiceResult<T>([...message], null!)

export const createSuccessServiceResult = <T>(
  data: T): ServiceResult<T> => createServiceResult<T>(null!, data)
