import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateFuncaoUseCase } from './update-funcao-use-case'

class UpdateFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      descricao,
      metaProducao,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateFuncaoUseCase = container.resolve(UpdateFuncaoUseCase)

    const result = await updateFuncaoUseCase.execute({
        id,
        descricao,
        metaProducao,
        desabilitado
      })
      .then(funcaoResult => {
        return funcaoResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateFuncaoController }
