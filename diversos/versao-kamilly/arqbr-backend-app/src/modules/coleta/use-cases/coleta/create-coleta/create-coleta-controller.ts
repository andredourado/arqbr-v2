import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateColetaUseCase } from './create-coleta-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      contratoId,
      departamentoId,
      solicitanteId,
      pontoColetaId,
      identificador,
      dataProgramadaColeta,
      horaProgramadaColeta,
      volumes,
      veiculoId,
      entregadorId,
      dataEfetivaColeta,
      horaEfetivaColeta,
      arquivoFotoProtocolo,
      statusId
    } = request.body

    const createColetaUseCase = container.resolve(CreateColetaUseCase)

    const result = await createColetaUseCase.execute({
        clienteId,
        contratoId,
        departamentoId,
        solicitanteId,
        pontoColetaId,
        identificador,
        dataProgramadaColeta,
        horaProgramadaColeta,
        volumes,
        veiculoId,
        entregadorId,
        dataEfetivaColeta,
        horaEfetivaColeta,
        arquivoFotoProtocolo,
        statusId
      })
      .then(coletaResult => {
        return coletaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateColetaController }
