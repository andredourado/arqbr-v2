import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountColetaUseCase } from './count-coleta-use-case'

class CountColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countColetaUseCase = container.resolve(CountColetaUseCase)

    const coletasCount = await countColetaUseCase.execute({
      search: search as string
    })

    return response.status(coletasCount.statusCode).json(coletasCount)
  }
}

export { CountColetaController }
