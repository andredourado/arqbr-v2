import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSugestaoUseCase } from './update-sugestao-use-case'

class UpdateSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      departamentoId,
      solicitanteId,
      titulo,
      descricao,
      atendido
    } = request.body

    const { id } = request.params

    const updateSugestaoUseCase = container.resolve(UpdateSugestaoUseCase)

    const result = await updateSugestaoUseCase.execute({
        id,
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

export { UpdateSugestaoController }
