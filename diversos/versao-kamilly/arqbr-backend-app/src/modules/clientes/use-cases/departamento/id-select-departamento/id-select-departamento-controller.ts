import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectDepartamentoUseCase } from './id-select-departamento-use-case'

class IdSelectDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectDepartamentoUseCase = container.resolve(IdSelectDepartamentoUseCase)

    const departamento = await idSelectDepartamentoUseCase.execute({
      id: id as string
    })

    return response.json(departamento.data)
  }
}

export { IdSelectDepartamentoController }
