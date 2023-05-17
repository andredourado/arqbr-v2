import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountDepartamentoUseCase } from './count-departamento-use-case'

class CountDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countDepartamentoUseCase = container.resolve(CountDepartamentoUseCase)

    const departamentosCount = await countDepartamentoUseCase.execute({
      search: search as string
    })

    return response.status(departamentosCount.statusCode).json(departamentosCount)
  }
}

export { CountDepartamentoController }
