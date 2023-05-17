import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePessoaUseCase } from './update-pessoa-use-case'

class UpdatePessoaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      unidadeId,
      nome,
      email,
      funcaoId,
      gerente,
      desabilitado
    } = request.body

    const { id } = request.params

    const updatePessoaUseCase = container.resolve(UpdatePessoaUseCase)

    const result = await updatePessoaUseCase.execute({
        id,
        unidadeId,
        nome,
        email,
        funcaoId,
        gerente,
        desabilitado
      })
      .then(pessoaResult => {
        return pessoaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePessoaController }
