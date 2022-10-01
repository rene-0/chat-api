import { HttpResponse } from '../protocols/http'

type BadRequestProps = {
  errors: string[]
  response?: string
}

export function badRequest ({ errors, response }: BadRequestProps): HttpResponse<any> {
  return {
    statusCode: 400,
    body: {
      response,
      errors
    }
  }
}

export function serverError (error: Error): HttpResponse<any> {
  return {
    statusCode: 500,
    body: process.env.NODE_ENV === 'production' ? 'Server error' : error.message
  }
}

export function ok<T> (body: T): HttpResponse<T> {
  return {
    statusCode: 200,
    body: body
  }
}

export function unauthorized (error: Error): HttpResponse<any> {
  return {
    statusCode: 401,
    body: error.message
  }
}

export function forbidden (error: Error): HttpResponse<any> {
  return {
    statusCode: 403,
    body: error.message
  }
}

export function noContent (error: Error): HttpResponse<any> {
  return {
    statusCode: 204,
    body: error.message
  }
}
