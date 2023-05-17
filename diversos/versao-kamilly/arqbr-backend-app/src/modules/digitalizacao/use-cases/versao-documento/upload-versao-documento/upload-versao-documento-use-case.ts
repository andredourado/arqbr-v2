import { inject, injectable } from 'tsyringe'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { HttpResponse, ok, serverError } from '@shared/helpers'
import { convertPdfToPng } from '../utils/convert-pdf-to-png/convert-pdf-to-png'
import { alignmentImage } from '../utils/alignment-image/alignment-image'


@injectable()
class UploadVersaoDocumentoUseCase {
  constructor() { }

  async execute(file: string): Promise<HttpResponse> {
    const convertPdfToPngPy = "src/modules/digitalizacao/use-cases/versao-documento/utils/convert-pdf-to-png/convert-pdf-to-png.py"
    const alignmentImagePy = "src/modules/digitalizacao/use-cases/versao-documento/utils/alignment-image/alignment-image.py"

    try {
      const { text, page } = await convertPdfToPng(convertPdfToPngPy, file, 'tmp/', 'tmp/images/')

      const isAligned = await alignmentImage(alignmentImagePy, file, Number(page))

      if (!isAligned) {
        return serverError(Error())
      }
      console.log(page)
      console.log(text)
      
      return ok({ page, file, text })
    } catch (err) {
      return serverError(err)
    }
  }
}

export { UploadVersaoDocumentoUseCase }
