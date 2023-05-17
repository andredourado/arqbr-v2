import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateColetaUseCase } from './update-coleta-use-case'

class UpdateColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
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
      arquivoFotoProtocolo
    } = request.body

    const { id } = request.params

    const updateColetaUseCase = container.resolve(UpdateColetaUseCase)

    const result = await updateColetaUseCase.execute({
        id,
        clienteId,
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
        arquivoFotoProtocolo
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

export { UpdateColetaController }
