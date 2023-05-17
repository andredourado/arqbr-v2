import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePontoColetaUseCase } from './update-ponto-coleta-use-case'

class UpdatePontoColetaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      clienteId,
      descricao,
      estadoId,
      cidadeId,
      endereco,
      numero,
      complemento,
      pessoaContatoNome,
      pessoaContatoCelular,
      desabilitado
    } = request.body

    const { id } = request.params

    const updatePontoColetaUseCase = container.resolve(UpdatePontoColetaUseCase)

    const result = await updatePontoColetaUseCase.execute({
        id,
        clienteId,
        descricao,
        estadoId,
        cidadeId,
        endereco,
        numero,
        complemento,
        pessoaContatoNome,
        pessoaContatoCelular,
        desabilitado
      })
      .then(pontoColetaResult => {
        return pontoColetaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdatePontoColetaController }
