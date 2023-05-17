import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPessoaUseCase } from './id-select-pessoa-use-case'

class IdSelectPessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPessoaUseCase = container.resolve(IdSelectPessoaUseCase)

    const pessoa = await idSelectPessoaUseCase.execute({
      id: id as string
    })

    return response.json(pessoa.data)
  }
}

export { IdSelectPessoaController }
