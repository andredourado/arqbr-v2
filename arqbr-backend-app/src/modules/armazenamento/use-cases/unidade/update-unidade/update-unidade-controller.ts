import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUnidadeUseCase } from './update-unidade-use-case'

class UpdateUnidadeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      estadoId,
      cidadeId,
      nome,
      endereco,
      numero,
      complemento,
      cep,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateUnidadeUseCase = container.resolve(UpdateUnidadeUseCase)

    const result = await updateUnidadeUseCase.execute({
        id,
        estadoId,
        cidadeId,
        nome,
        endereco,
        numero,
        complemento,
        cep,
        desabilitado
      })
      .then(unidadeResult => {
        return unidadeResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateUnidadeController }
