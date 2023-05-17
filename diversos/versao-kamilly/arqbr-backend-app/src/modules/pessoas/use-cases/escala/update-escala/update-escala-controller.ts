import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateEscalaUseCase } from './update-escala-use-case'

class UpdateEscalaController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      pessoaId,
      jornadaId,
      desabilitado
    } = request.body

    const { id } = request.params

    const updateEscalaUseCase = container.resolve(UpdateEscalaUseCase)

    const result = await updateEscalaUseCase.execute({
        id,
        pessoaId,
        jornadaId,
        desabilitado
      })
      .then(escalaResult => {
        return escalaResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { UpdateEscalaController }
