import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectSugestaoUseCase } from './id-select-sugestao-use-case'

class IdSelectSugestaoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectSugestaoUseCase = container.resolve(IdSelectSugestaoUseCase)

    const sugestao = await idSelectSugestaoUseCase.execute({
      id: id as string
    })

    return response.json(sugestao.data)
  }
}

export { IdSelectSugestaoController }
