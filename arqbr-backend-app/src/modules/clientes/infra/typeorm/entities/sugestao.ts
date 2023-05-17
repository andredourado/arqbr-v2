import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { Solicitante } from '@modules/clientes/infra/typeorm/entities/solicitante'

@Entity('sugestoes')
class Sugestao {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @ManyToOne(() => Solicitante, { nullable: true, eager: true })
  @JoinColumn({ name: 'solicitante_id', referencedColumnName: 'id' })
  solicitanteId?: string

  @Column({ name: 'titulo', nullable: true })
  titulo?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

  @Column({ name: 'atendido', nullable: true, default: false })
  atendido?: boolean

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

export { Sugestao }
