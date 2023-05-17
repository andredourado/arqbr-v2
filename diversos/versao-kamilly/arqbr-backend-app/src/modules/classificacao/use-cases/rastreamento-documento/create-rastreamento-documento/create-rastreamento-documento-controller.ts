import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRastreamentoDocumentoUseCase } from './create-rastreamento-documento-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    } = request.body

    const createRastreamentoDocumentoUseCase = container.resolve(CreateRastreamentoDocumentoUseCase)

    const result = await createRastreamentoDocumentoUseCase.execute({
        volumeId,
        dataMovimentacao,
        horaMovimentacao,
        localDeArmazenagem,
        statusId
      })
      .then(rastreamentoDocumentoResult => {
        return rastreamentoDocumentoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateRastreamentoDocumentoController }
