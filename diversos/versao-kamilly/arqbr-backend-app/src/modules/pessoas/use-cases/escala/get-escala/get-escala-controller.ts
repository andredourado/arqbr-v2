import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEscalaUseCase } from './get-escala-use-case'

class GetEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getEscalaUseCase = container.resolve(GetEscalaUseCase)
    const escala = await getEscalaUseCase.execute(id)

    return response.status(escala.statusCode).json(escala.data)
  }
}

export { GetEscalaController }
