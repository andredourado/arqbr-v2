import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSolicitanteUseCase } from './create-solicitante-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateSolicitanteController {
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

    const createSolicitanteUseCase = container.resolve(CreateSolicitanteUseCase)

    const result = await createSolicitanteUseCase.execute({
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

export { CreateSolicitanteController }
