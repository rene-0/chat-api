import { Controller } from '../../presentation/protocols/controller'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const accessToken = req?.headers['x-access-token']
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accessToken
    }
    const httpResponse = await controller.handle(request)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
