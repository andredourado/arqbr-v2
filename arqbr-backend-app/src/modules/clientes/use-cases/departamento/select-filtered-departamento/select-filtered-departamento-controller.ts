import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectFilteredDepartamentoUseCase } from './select-filtered-departamento-use-case'

class SelectFilteredDepartamentoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter, clienteId } = request.query

    const selectFilteredDepartamentoUseCase = container.resolve(SelectFilteredDepartamentoUseCase)

    const departamentos = await selectFilteredDepartamentoUseCase.execute({
      filter: filter as string,
      clienteId: clienteId as string
    })

    return response.json(departamentos)
  }
}

export { SelectFilteredDepartamentoController }
