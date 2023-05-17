import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPontoColetaUseCase } from './count-ponto-coleta-use-case'

class CountPontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPontoColetaUseCase = container.resolve(CountPontoColetaUseCase)

    const pontosColetaCount = await countPontoColetaUseCase.execute({
      search: search as string
    })

    return response.status(pontosColetaCount.statusCode).json(pontosColetaCount)
  }
}

export { CountPontoColetaController }
