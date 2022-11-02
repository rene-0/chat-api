export type ValidationErrorModel<T = {}> = T & {
  isValid: boolean
  errorMessage: string[]
}
