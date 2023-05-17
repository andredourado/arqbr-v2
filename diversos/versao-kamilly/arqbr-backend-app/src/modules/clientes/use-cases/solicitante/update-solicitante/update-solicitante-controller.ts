import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSolicitanteUseCase } from './update-solicitante-use-case'

class UpdateSolicitanteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      nome,
      email,
      telefonesFixos,
      celular,
      gerenteDepartamento,
      gestorContrato,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateSolicitanteUseCase = container.resolve(UpdateSolicitanteUseCase)

    const result = await updateSolicitanteUseCase.execute({
        id,
        clienteId,
        departamentoId,
        nome,
        email,
        telefonesFixos,
        celular,
        gerenteDepartamento,
        gestorContrato,
        desabilitado
      })
      .then(solicitanteResult => {
        return solicitanteResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateSolicitanteController }
