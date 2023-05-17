import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { Servico } from '@modules/comum/infra/typeorm/entities/servico'
import { UnidadeSla } from '@modules/comum/infra/typeorm/entities/unidade-sla'

@Entity('servicos_contratados')
class ServicoContratado {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Contrato, { nullable: true, eager: true })
  @JoinColumn({ name: 'contrato_id', referencedColumnName: 'id' })
  contratoId?: string

  @ManyToOne(() => Servico, { nullable: true, eager: true })
  @JoinColumn({ name: 'servico_id', referencedColumnName: 'id' })
  servicoId?: string

  @ManyToOne(() => UnidadeSla, { nullable: true, eager: true })
  @JoinColumn({ name: 'unidade_sla_id', referencedColumnName: 'id' })
  unidadeSlaId?: string

  @Column({ name: 'sla', nullable: true })
  sla?: Number

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

export { ServicoContratado }
