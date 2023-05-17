import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountContratoUseCase } from './count-contrato-use-case'

class CountContratoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countContratoUseCase = container.resolve(CountContratoUseCase)

    const contratosCount = await countContratoUseCase.execute({
      search: search as string
    })

    return response.status(contratosCount.statusCode).json(contratosCount)
  }
}

export { CountContratoController }
