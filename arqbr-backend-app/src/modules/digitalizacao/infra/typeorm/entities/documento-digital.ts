import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'

@Entity('documentos_digitais')
class DocumentoDigital {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @ManyToOne(() => TipoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'tipo_documento_id', referencedColumnName: 'id' })
  tipoDocumentoId?: string

  @Column({ name: 'nome_arquivo', nullable: true })
  nomeArquivo?: string

  @Column({ name: 'nome_arquivo_origem', nullable: true })
  nomeArquivoOrigem?: string

  @Column({ name: 'conteudo_em_texto', nullable: true })
  conteudoEmTexto?: string

  @Column({ name: 'numero_paginas', nullable: true })
  numeroPaginas?: Number

  @Column({ name: 'solicitacao_fisico', nullable: true, default: false })
  solicitacaoFisico?: boolean

  @Column({ name: 'data_solicitacao', nullable: true, type: 'timestamptz' })
  dataSolicitacao?: Date

  @ManyToOne(() => Solicitante, { nullable: true, eager: true })
  @JoinColumn({ name: 'solicitante_id', referencedColumnName: 'id' })
  solicitanteId?: string

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { DocumentoDigital }
