import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateRastreamentoDocumentoUseCase } from './update-rastreamento-documento-use-case'

class UpdateRastreamentoDocumentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      volumeId,
      dataMovimentacao,
      horaMovimentacao,
      localDeArmazenagem,
      statusId
    } = request.body

    const { id } = request.params

    const updateRastreamentoDocumentoUseCase = container.resolve(UpdateRastreamentoDocumentoUseCase)

    const result = await updateRastreamentoDocumentoUseCase.execute({
        id,
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

export { UpdateRastreamentoDocumentoController }
