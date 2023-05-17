import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSugestaoUseCase } from './create-sugestao-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      solicitanteId,
      titulo,
      descricao,
      atendido
    } = request.body

    const createSugestaoUseCase = container.resolve(CreateSugestaoUseCase)

    const result = await createSugestaoUseCase.execute({
        clienteId,
        departamentoId,
        solicitanteId,
        titulo,
        descricao,
        atendido
      })
      .then(sugestaoResult => {
        return sugestaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateSugestaoController }
