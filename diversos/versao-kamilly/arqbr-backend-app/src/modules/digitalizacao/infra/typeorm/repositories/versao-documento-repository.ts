import { getRepository, Repository } from 'typeorm'
import { IVersaoDocumentoDTO } from '@modules/digitalizacao/dtos/i-versao-documento-dto'
import { IVersaoDocumentoRepository } from '@modules/digitalizacao/repositories/i-versao-documento-repository'
import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class VersaoDocumentoRepository implements IVersaoDocumentoRepository {
  private repository: Repository<VersaoDocumento>

  constructor() {
    this.repository = getRepository(VersaoDocumento)
  }

  // create
  async create ({
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    descricaoVersao,
    qrcode,
    file,
    pageQuantity,
    desabilitado
  }: IVersaoDocumentoDTO): Promise<HttpResponse> {
    const versaoDocumento = this.repository.create({
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      descricaoVersao,
      qrcode,
      file,
      pageQuantity,
      desabilitado
    })

    const result = await this.repository.save(versaoDocumento)
      .then(versaoDocumentoResult => {
        return ok(versaoDocumentoResult)
      })
      .catch(error => {
        console.log(error)
        return serverError(error.message)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "clienteNomeFantasia",
      "contratoIdentificador",
      "departamentoNome",
      "tipoDocumentoDescricao",
      "descricaoVersao",
      "qrcode"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let versoesDocumento = await this.repository.createQueryBuilder('ver')
        .select([
          'ver.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "contratoId"',
          'b.identificador as "contratoIdentificador"',
          'c.id as "departamentoId"',
          'c.nome as "departamentoNome"',
          'd.id as "tipoDocumentoId"',
          'd.descricao as "tipoDocumentoDescricao"',
          'ver.descricaoVersao as "descricaoVersao"',
          'ver.qrcode as "qrcode"',
        ])
        .leftJoin('ver.clienteId', 'a')
        .leftJoin('ver.contratoId', 'b')
        .leftJoin('ver.departamentoId', 'c')
        .leftJoin('ver.tipoDocumentoId', 'd')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('ver.descricaoVersao ilike :search', { search: `%${search}%` })
        .orWhere('ver.qrcode ilike :search', { search: `%${search}%` })
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.identificador', columnOrder[1])
        .addOrderBy('c.nome', columnOrder[2])
        .addOrderBy('d.descricao', columnOrder[3])
        .addOrderBy('ver.descricaoVersao', columnOrder[4])
        .addOrderBy('ver.qrcode', columnOrder[4])
        .take(rowsPerPage)
        .skip(offset)
        .getRawMany()

      // below statements are to solve typeorm bug related to use of leftjoins, filters, .take and .skip together

      if (versoesDocumento.length > rowsPerPage) {
        versoesDocumento = versoesDocumento.slice(offset, offset + rowsPerPage)
      }

      //

      return ok(versoesDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const versoesDocumento = await this.repository.createQueryBuilder('ver')
        .select([
          'ver.id as "value"',
          'tip.descricao as "label"',
          'cam.id as "campoId"',
          'cam.name as "campo"'
        ])
        .innerJoin('tipos_documento', 'tip', 'ver.tipoDocumentoId = tip.id')
        .innerJoin('campos', 'cam', 'cam.versaoDocumentoId = ver.id')
        .where('tip.descricao ilike :filter', { filter: `${filter}%` })
        .addOrderBy('tip.descricao')
        .getRawMany()

      const versoes = []
      let lastvalue = ''
      let lastlabel = ''
      let campos = []
      versoesDocumento.map(versaoDocumento => {
        if (versaoDocumento.value != lastvalue && lastvalue != '') {
          versoes.push({
            value: lastvalue, 
            label: lastlabel,
            campos: campos
          })
          campos = []
        }
        campos.push({
          value: versaoDocumento.campoId,
          label: versaoDocumento.campo
        })
        lastvalue = versaoDocumento.value
        lastlabel = versaoDocumento.label
      })
      
      versoes.push({
        value: lastvalue, 
        label: lastlabel,
        campos: campos
      })

      return ok(versoes)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const versaoDocumento = await this.repository.createQueryBuilder('ver')
        .select([
          'ver.id as "value"',
          'ver.descricaoVersao as "label"',
        ])
        .where('ver.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(versaoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
  ): Promise<HttpResponse> {
    try {
      const versoesDocumento = await this.repository.createQueryBuilder('ver')
        .select([
          'ver.id as "id"',
        ])
        .leftJoin('ver.clienteId', 'a')
        .leftJoin('ver.contratoId', 'b')
        .leftJoin('ver.departamentoId', 'c')
        .leftJoin('ver.tipoDocumentoId', 'd')
        .where('a.nomeFantasia ilike :search', { search: `%${search}%` })
        .orWhere('ver.descricaoVersao ilike :search', { search: `%${search}%` })
        .orWhere('ver.qrcode ilike :search', { search: `%${search}%` })
        .getRawMany()

      return ok({ count: versoesDocumento.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const versaoDocumento = await this.repository.createQueryBuilder('ver')
        .select([
          'ver.id as "id"',
          'ver.clienteId as "clienteId"',
          'ver.contratoId as "contratoId"',
          'ver.departamentoId as "departamentoId"',
          'ver.tipoDocumentoId as "tipoDocumentoId"',
          'ver.descricaoVersao as "descricaoVersao"',
          'ver.crcode as "qrcode"',
          'ver.file as "file"',
          'ver.pageQuantity as "pageQuantity"',
          'ver.desabilitado as "desabilitado"',
          'cam.id as "campoId"',
          'cam.page as "page"',
          'cam.name as "name"',
          'cam.start_x as "startX"',
          'cam.start_y as "startY"',
          'cam.end_x as "endX"',
          'cam.end_y as "endY"',
          'cam.linha as "linha"',
          'cam.coluna as "coluna"',
          'cam.resultado_esperado as "resultadoEsperado"',
          'cam.complemento as "complemento"',
          'cam.mascara as "mascara"',
          'cam.comprimento as "comprimento"',
          'cam.ocorrencia as "ocorrencia"',
          'cam.referencia as "referencia"',
          'cam.localizacao as "localizacao"',
        ])
        .innerJoin('campos', 'cam', 'cam.versao_documento_id = ver.id') 
        .where('ver.id = :id', { id })
        .getRawMany()

      if (typeof versaoDocumento === 'undefined') {
        return noContent()
      }

      const newVersaoDocumento = {
        clienteId: versaoDocumento[0].clienteId,
        contratoId: versaoDocumento[0].contratoId,
        departamentoId: versaoDocumento[0].departamentoId,
        tipoDocumentoId: versaoDocumento[0].tipoDocumentoId,
        descricaoVersao: versaoDocumento[0].descricaoVersao,
        qrcode: versaoDocumento[0].qrcode,
        file: versaoDocumento[0].file,
        pageQuantity: versaoDocumento[0].pageQuantity,
        desabilitado: versaoDocumento[0].desabilitado,
        squares: [], 
        texts: []
      }

      versaoDocumento.map((campo) => {
        if (campo.startX || campo.startY || campo.endX || campo.endY) {
          newVersaoDocumento.squares.push({
            id: campo.campoId,
            page: campo.page,
            name: campo.name,
            startX: campo.startX,
            startY: campo.startY,
            endX: campo.endX,
            endY: campo.endY
          })
        }

        if (campo.resultadoEsperado || campo.complemento || campo.mascara || campo.comprimento || campo.ocorrencia || campo.referencia || campo.localizacao) {
          newVersaoDocumento.texts.push({
            id: campo.campoId,
            page: campo.page,
            name: campo.name,
            linha: campo.linha,
            coluna: campo.coluna,
            resultadoEsperado: campo.resultadoEsperado,
            complemento: campo.complemento,
            mascara: campo.mascara,
            comprimento: campo.comprimento,
            ocorrencia: campo.ocorrencia,
            referencia: campo.referencia,
            localizacao: campo.localizacao,
          })
        }
      })

      return ok(newVersaoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    contratoId,
    departamentoId,
    tipoDocumentoId,
    descricaoVersao,
    qrcode,
    squares,
    file,
    pageQuantity,
    desabilitado
  }: IVersaoDocumentoDTO): Promise<HttpResponse> {
    const versaoDocumento = await this.repository.createQueryBuilder("ver")
      .select()
      .where("ver.id = :id", { id }) 
      .getOne()     

    if (!versaoDocumento) {
      return notFound()
    }

    const newVersaoDocumento = this.repository.create({
      id,
      clienteId,
      contratoId,
      departamentoId,
      tipoDocumentoId,
      descricaoVersao,
      qrcode,
      squares,
      file,
      pageQuantity,
      desabilitado
    })

    try {
      await this.repository.save(newVersaoDocumento)

      return ok(newVersaoDocumento)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { VersaoDocumentoRepository }