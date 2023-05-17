import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPontoColetaUseCase } from './get-ponto-coleta-use-case'

class GetPontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPontoColetaUseCase = container.resolve(GetPontoColetaUseCase)
    const pontoColeta = await getPontoColetaUseCase.execute(id)

    return response.status(pontoColeta.statusCode).json(pontoColeta.data)
  }
}

export { GetPontoColetaController }
