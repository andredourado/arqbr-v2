import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectColetaUseCase } from './id-select-coleta-use-case'

class IdSelectColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectColetaUseCase = container.resolve(IdSelectColetaUseCase)

    const coleta = await idSelectColetaUseCase.execute({
      id: id as string
    })

    return response.json(coleta.data)
  }
}

export { IdSelectColetaController }
