import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Estado } from '@modules/comum/infra/typeorm/entities/estado'
import { Cidade } from '@modules/comum/infra/typeorm/entities/cidade'

@Entity('clientes')
class Cliente {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'cnpj', nullable: true })
  cnpj?: string

  @Column({ name: 'nome_fantasia', nullable: true })
  nomeFantasia?: string

  @Column({ name: 'razao_social', nullable: true })
  razaoSocial?: string

  @Column({ name: 'inscricao_estadual', nullable: true })
  inscricaoEstadual?: string

  @Column({ name: 'endereco', nullable: true })
  endereco?: string

  @Column({ name: 'numero', nullable: true })
  numero?: string

  @Column({ name: 'complemento', nullable: true })
  complemento?: string

  @ManyToOne(() => Estado, { nullable: true, eager: true })
  @JoinColumn({ name: 'estado_id', referencedColumnName: 'id' })
  estadoId?: string

  @ManyToOne(() => Cidade, { nullable: true, eager: true })
  @JoinColumn({ name: 'cidade_id', referencedColumnName: 'id' })
  cidadeId?: string

  @Column({ name: 'cep', nullable: true })
  cep?: string

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

export { Cliente }
