import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectFuncaoUseCase } from './id-select-funcao-use-case'

class IdSelectFuncaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectFuncaoUseCase = container.resolve(IdSelectFuncaoUseCase)

    const funcao = await idSelectFuncaoUseCase.execute({
      id: id as string
    })

    return response.json(funcao.data)
  }
}

export { IdSelectFuncaoController }
