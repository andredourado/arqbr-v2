import { Brackets, getRepository, Repository } from 'typeorm'
import { IDefinicaoExtracaoDTO } from '@modules/digitalizacao/dtos/i-definicao-extracao-dto'
import { IDefinicaoExtracaoRepository } from '@modules/digitalizacao/repositories/i-definicao-extracao-repository'
import { DefinicaoExtracao } from '@modules/digitalizacao/infra/typeorm/entities/definicao-extracao'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'
import { newObjectBuilder } from '@utils/new-object-constructor'

class DefinicaoExtracaoRepository implements IDefinicaoExtracaoRepository {
  private repository: Repository<DefinicaoExtracao>

  constructor() {
    this.repository = getRepository(DefinicaoExtracao)
  }


  // create
  async create ({
    clienteId,
    departamentoId,
    tipoDocumentoId,
    pdf,
    textos
  }: IDefinicaoExtracaoDTO): Promise<HttpResponse> {

    try {
      for await (let texto of textos) {
        const definicaoExtracao = this.repository.create({
          clienteId,
          departamentoId,
          tipoDocumentoId,
          pdf,
          textoQuebra: texto.textoQuebra,
          nomeCampo: texto.nomeCampo,
          titulo: texto.titulo,
          estrategia: texto.estrategia,
          texto: texto.texto,
          linha: texto.linha,
          inicio: texto.inicio,
          comprimento: texto.comprimento
        })

        await this.repository.save(definicaoExtracao)
      }

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
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
      "departamentoNome",
      "tipoDocumentoDescricao",
      "pdf"
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('def')
        .select([
          'def.id as "id"',
          'a.id as "clienteId"',
          'a.nomeFantasia as "clienteNomeFantasia"',
          'b.id as "departamentoId"',
          'b.nome as "departamentoNome"',
          'c.id as "tipoDocumentoId"',
          'c.descricao as "tipoDocumentoDescricao"',
          'def.pdf as "pdf"',
        ])
        .leftJoin('def.clienteId', 'a')
        .leftJoin('def.departamentoId', 'b')
        .leftJoin('def.tipoDocumentoId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const definicoesExtracao = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.nomeFantasia', columnOrder[0])
        .addOrderBy('b.nome', columnOrder[1])
        .addOrderBy('c.descricao', columnOrder[2])
        .addOrderBy('def.pdf', columnOrder[3])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(definicoesExtracao)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const definicoesExtracao = await this.repository.createQueryBuilder('def')
        .select([
          'def. as "value"',
          'def. as "label"',
        ])
        .where('def. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('def.')
        .getRawMany()

      return ok(definicoesExtracao)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const definicaoExtracao = await this.repository.createQueryBuilder('def')
        .select([
          'def. as "value"',
          'def. as "label"',
        ])
        .where('def. = :id', { id: `${id}` })
        .getRawOne()

      return ok(definicaoExtracao)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('def')
        .select([
          'def.id as "id"',
        ])
        .leftJoin('def.clienteId', 'a')
        .leftJoin('def.departamentoId', 'b')
        .leftJoin('def.tipoDocumentoId', 'c')

      if (filter) {
        query = query
          .where(filter)
      }

      const definicoesExtracao = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.nomeFantasia AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: definicoesExtracao.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const definicaoExtracao = await this.repository.createQueryBuilder('def')
        .select([
          'def.id as "id"',
          'def.clienteId as "clienteId"',
          'def.departamentoId as "departamentoId"',
          'def.tipoDocumentoId as "tipoDocumentoId"',
          'def.pdf as "pdf"',
          'def.textoQuebra as "textoQuebra"',
          'def.nomeCampo as "nomeCampo"',
          'def.titulo as "titulo"',
          'def.estrategia as "estrategia"',
          'def.texto as "texto"',
          'def.linha as "linha"',
          'def.inicio as "inicio"',
          'def.comprimento as "comprimento"'
        ])
        .where('def.id = :id', { id })
        .getRawMany()

      if (typeof definicaoExtracao === 'undefined') {
        return noContent()
      }

      const newDefinicaoExtracao = newObjectBuilder({
        data: definicaoExtracao,
        ref: 'clienteId',
        variablesToArray: [ 'textoQuebra', 'nomeCampo', 'titulo', 'estrategia', 'texto', 'linha', 'inicio', 'comprimento' ],
        nameArrayVariable: 'textos'
      })

      return ok(newDefinicaoExtracao[0])
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    clienteId,
    departamentoId,
    tipoDocumentoId,
    pdf,
    textoQuebra,
    nomeCampo,
    titulo,
    estrategia,
    texto,
    linha,
    inicio,
    comprimento
  }: IDefinicaoExtracaoDTO): Promise<HttpResponse> {
    const definicaoExtracao = await this.repository.findOne(id)

    if (!definicaoExtracao) {
      return notFound()
    }

    const newdefinicaoExtracao = this.repository.create({
      id,
      clienteId,
      departamentoId,
      tipoDocumentoId,
      pdf,
      textoQuebra,
      nomeCampo,
      titulo,
      estrategia,
      texto,
      linha,
      inicio,
      comprimento
    })

    try {
      await this.repository.save(newdefinicaoExtracao)

      return ok(newdefinicaoExtracao)
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

export { DefinicaoExtracaoRepository }
