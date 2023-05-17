import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteDepartamentoUseCase } from './multi-delete-departamento-use-case'
import { ListDepartamentoUseCase } from '../list-departamento/list-departamento-use-case'

class MultiDeleteDepartamentoController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteDepartamentoUseCase = container.resolve(MultiDeleteDepartamentoUseCase)
    await multiDeleteDepartamentoUseCase.execute(ids)


    // restore list with updated records

    const listDepartamentoUseCase = container.resolve(ListDepartamentoUseCase)
    const departamentos = await listDepartamentoUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(departamentos)
  }
}

export { MultiDeleteDepartamentoController }
