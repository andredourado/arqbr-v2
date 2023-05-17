import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateServicoUseCase } from './update-servico-use-case'

class UpdateServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateServicoUseCase = container.resolve(UpdateServicoUseCase)

    const result = await updateServicoUseCase.execute({
        id,
        descricao,
        desabilitado
      })
      .then(servicoResult => {
        return servicoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateServicoController }
