import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCaixaQuebraUseCase } from './id-select-caixa-quebra-use-case'

class IdSelectCaixaQuebraController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCaixaQuebraUseCase = container.resolve(IdSelectCaixaQuebraUseCase)

    const caixaQuebra = await idSelectCaixaQuebraUseCase.execute({
      id: id as string
    })

    return response.json(caixaQuebra.data)
  }
}

export { IdSelectCaixaQuebraController }
