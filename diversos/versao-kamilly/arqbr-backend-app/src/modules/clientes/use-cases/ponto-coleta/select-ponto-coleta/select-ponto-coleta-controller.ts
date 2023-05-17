import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPontoColetaUseCase } from './select-ponto-coleta-use-case'

class SelectPontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, clienteId } = request.query

    const selectPontoColetaUseCase = container.resolve(SelectPontoColetaUseCase)

    const pontosColeta = await selectPontoColetaUseCase.execute({
      filter: filter as string,
      clienteId: clienteId as string
    })

    return response.json(pontosColeta)
  }
}

export { SelectPontoColetaController }
