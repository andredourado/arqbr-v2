import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetFuncaoUseCase } from './get-funcao-use-case'

class GetFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getFuncaoUseCase = container.resolve(GetFuncaoUseCase)
    const funcao = await getFuncaoUseCase.execute(id)

    return response.status(funcao.statusCode).json(funcao.data)
  }
}

export { GetFuncaoController }
