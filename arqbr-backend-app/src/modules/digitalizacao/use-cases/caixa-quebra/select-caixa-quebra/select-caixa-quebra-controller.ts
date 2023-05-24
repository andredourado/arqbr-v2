import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCaixaQuebraUseCase } from './select-caixa-quebra-use-case'

class SelectCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCaixaQuebraUseCase = container.resolve(SelectCaixaQuebraUseCase)

    const caixasQuebras = await selectCaixaQuebraUseCase.execute({
      filter: filter as string,
    })

    return response.json(caixasQuebras)
  }
}

export { SelectCaixaQuebraController }
