import { ValidationErrorModel } from '../../domain/models/validation-error-model'
import { HttpResponse } from '../protocols/http'

type BadRequestProps<T> = Omit<ValidationErrorModel<T>, 'isValid'>

export function badRequest<T> (response: BadRequestProps<T>): HttpResponse<any> {
  return {
    statusCode: 400,
    body: {
      response
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
