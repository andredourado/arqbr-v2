import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteFrequenciaColetaUseCase } from './multi-delete-frequencia-coleta-use-case'
import { ListFrequenciaColetaUseCase } from '../list-frequencia-coleta/list-frequencia-coleta-use-case'

class MultiDeleteFrequenciaColetaController {
  async handle(request: Request, response: Response ): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteFrequenciaColetaUseCase = container.resolve(MultiDeleteFrequenciaColetaUseCase)
    await multiDeleteFrequenciaColetaUseCase.execute(ids)


    // restore list with updated records

    const listFrequenciaColetaUseCase = container.resolve(ListFrequenciaColetaUseCase)
    const frequenciaColetas = await listFrequenciaColetaUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(frequenciaColetas)
  }
}

export { MultiDeleteFrequenciaColetaController }
