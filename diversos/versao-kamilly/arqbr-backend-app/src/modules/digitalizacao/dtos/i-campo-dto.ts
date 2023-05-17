interface ICampoDTO {
  id?: string,
  versaoDocumentoId?: string,
  page?: number,
  name?: string, 
  startX: number, 
  startY: number,
  endX: number,
  endY: number
  linha?: string
  coluna?: string
  resultadoEsperado?: string
  complemento?: string
  mascara?: string
  comprimento?: number
  ocorrencia?: string
  referencia?: string
  localizacao?: string
  createdAt?: Date
  updatedAt?: Date
}

export { ICampoDTO }
