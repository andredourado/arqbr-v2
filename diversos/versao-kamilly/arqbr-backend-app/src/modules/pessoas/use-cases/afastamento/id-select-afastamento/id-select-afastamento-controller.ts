import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectAfastamentoUseCase } from './id-select-afastamento-use-case'

class IdSelectAfastamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectAfastamentoUseCase = container.resolve(IdSelectAfastamentoUseCase)

    const afastamento = await idSelectAfastamentoUseCase.execute({
      id: id as string
    })

    return response.json(afastamento.data)
  }
}

export { IdSelectAfastamentoController }
