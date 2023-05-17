import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { ComposicaoLote } from '@modules/comum/infra/typeorm/entities/composicao-lote'

@Entity('tipos_documento')
class TipoDocumento {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Contrato, { nullable: true, eager: true })
  @JoinColumn({ name: 'contrato_id', referencedColumnName: 'id' })
  contratoId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

  @ManyToOne(() => ComposicaoLote, { nullable: true, eager: true })
  @JoinColumn({ name: 'composicao_lote_id', referencedColumnName: 'id' })
  composicaoLoteId?: string

  @Column({ name: 'numero_paginas', nullable: true })
  numeroPaginas?: Number

  @Column({ name: 'mascara_nome_arquivo', nullable: true })
  mascaraNomeArquivo?: string

  @Column({ name: 'prazo_descarte_anos', nullable: true })
  prazoDescarteAnos?: string

  @Column({ name: 'desabilitado', nullable: true, default: false })
  desabilitado?: boolean

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

export { TipoDocumento }
