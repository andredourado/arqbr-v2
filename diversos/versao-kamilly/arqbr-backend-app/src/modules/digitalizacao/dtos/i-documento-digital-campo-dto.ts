interface IDocumentoDigitalCampoDTO {
  id?: string
  documentoDigitalId?: string
  campoId?: string
  conteudo?: string
  indiceQualidadeExtracao?: number
  pessoaId?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IDocumentoDigitalCampoDTO }
