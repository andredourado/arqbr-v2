import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteFrequenciaUseCase } from './multi-delete-frequencia-use-case'
import { ListFrequenciaUseCase } from '../list-frequencia/list-frequencia-use-case'

class MultiDeleteFrequenciaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteFrequenciaUseCase = container.resolve(MultiDeleteFrequenciaUseCase)
    await multiDeleteFrequenciaUseCase.execute(ids)


    // restore list with updated records

    const listFrequenciaUseCase = container.resolve(ListFrequenciaUseCase)
    const frequencias = await listFrequenciaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(frequencias)
  }
}

export { MultiDeleteFrequenciaController }
