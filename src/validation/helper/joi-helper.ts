import Joi from 'joi'

export const JoiHelper = {
  messageStripper (error: Joi.ValidationError): string[] {
    const errors = error.details.map(detail => detail.message)
    return errors
  }
}
