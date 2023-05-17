import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPontoColetaUseCase } from './id-select-ponto-coleta-use-case'

class IdSelectPontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPontoColetaUseCase = container.resolve(IdSelectPontoColetaUseCase)

    const pontoColeta = await idSelectPontoColetaUseCase.execute({
      id: id as string
    })

    return response.json(pontoColeta.data)
  }
}

export { IdSelectPontoColetaController }
