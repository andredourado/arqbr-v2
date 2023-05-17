import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetColetaUseCase } from './get-coleta-use-case'

class GetColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getColetaUseCase = container.resolve(GetColetaUseCase)
    const coleta = await getColetaUseCase.execute(id)

    return response.status(coleta.statusCode).json(coleta.data)
  }
}

export { GetColetaController }
