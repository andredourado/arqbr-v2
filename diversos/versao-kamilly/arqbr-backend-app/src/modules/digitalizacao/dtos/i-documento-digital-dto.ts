interface IDocumentoDigitalDTO {
  id?: string
  dataDigitalizacao?: Date
  versaoDocumentoId?: string
  nip?: string
  conteudoQrCode?: string
  nomeArquivo?: string
  conteudoEmTexto?: string
  pessoaId?: string
  createdAt?: Date
  updatedAt?: Date
}

export { IDocumentoDigitalDTO }
