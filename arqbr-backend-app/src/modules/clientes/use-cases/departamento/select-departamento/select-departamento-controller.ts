import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectDepartamentoUseCase } from './select-departamento-use-case'

class SelectDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, clienteId } = request.query

    const selectDepartamentoUseCase = container.resolve(SelectDepartamentoUseCase)

    const departamentos = await selectDepartamentoUseCase.execute({
      filter: filter as string,
      clienteId: clienteId as string
    })

    return response.json(departamentos)
  }
}

export { SelectDepartamentoController }
