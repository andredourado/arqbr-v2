import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetDepartamentoUseCase } from './get-departamento-use-case'

class GetDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getDepartamentoUseCase = container.resolve(GetDepartamentoUseCase)
    const departamento = await getDepartamentoUseCase.execute(id)

    return response.status(departamento.statusCode).json(departamento.data)
  }
}

export { GetDepartamentoController }
