import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateServicoUseCase } from './create-servico-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateServicoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      desabilitado
    } = request.body

    const createServicoUseCase = container.resolve(CreateServicoUseCase)

    const result = await createServicoUseCase.execute({
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

export { CreateServicoController }
