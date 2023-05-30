import { inject, injectable } from 'tsyringe'
import  path from 'path'
import { exec } from 'child_process'
import { HttpResponse, ok } from '@shared/helpers/http'
import { IStorageProvider } from '@shared/container/providers/storage-provider/i-storage-provider'
import { IDocumentoDigitalRepository } from '@modules/digitalizacao/repositories/i-documento-digital-repository'

interface IRequest {
  nomeArquivo: string,
  numeroPaginas?: number
}

const extractTextPromise = (nomeArquivo: string, numeroPaginas: number): Promise<any> => {
  const script = path.resolve(__dirname, "../../../../../utils/extract-texts/teste-verifica-documento.js")
  const execScript = `node ${script} ${nomeArquivo} ${numeroPaginas}`
  console.log(execScript)
  return new Promise((res, rej) => {
    exec(execScript, (error, stdout, stderr) => {
      console.log(stderr)
      if (error) {
        console.error(`Error executing script: ${error}`)
        rej(error)
      }
    
      res(stdout)
    })
  })
}

@injectable()
class ExtracaoDocumentoDigitalUseCase {
  constructor(
    @inject('DocumentoDigitalRepository')
    private documentoDigitalRepository: IDocumentoDigitalRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }
  async execute({
    nomeArquivo,
    numeroPaginas = 20
  }: IRequest): Promise<HttpResponse> {
    console.log(nomeArquivo)
    const text = await extractTextPromise(nomeArquivo, numeroPaginas)
    // console.log('@#$%¨&*(*¨%$@$$%¨¨$##$$%¨¨&&**()**&¨%$$#$%%¨¨&***&&¨%$##$%%¨¨&&*(*&¨%$%¨&*(*&¨%¨&*&¨%')
    // console.log(text)
    // console.log('@#$%¨&*(*¨%$@$$%¨¨$##$$%¨¨&&**()**&¨%$$#$%%¨¨&***&&¨%$##$%%¨¨&&*(*&¨%$%¨&*(*&¨%¨&*&¨%')
    return ok(text)
  }
}

export { ExtracaoDocumentoDigitalUseCase }
