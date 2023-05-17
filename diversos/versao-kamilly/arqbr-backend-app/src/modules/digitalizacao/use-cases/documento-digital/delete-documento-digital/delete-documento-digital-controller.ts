import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDocumentoDigitalUseCase } from './delete-documento-digital-use-case'
import { ListDocumentoDigitalUseCase } from '../list-documento-digital/list-documento-digital-use-case'

class DeleteDocumentoDigitalController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteDocumentoDigitalUseCase = container.resolve(DeleteDocumentoDigitalUseCase)
    await deleteDocumentoDigitalUseCase.execute(id)


    // restore list with updated records

    const listDocumentoDigitalUseCase = container.resolve(ListDocumentoDigitalUseCase)
    const documentosDigitais = await listDocumentoDigitalUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(documentosDigitais)
  }
}

export { DeleteDocumentoDigitalController }
