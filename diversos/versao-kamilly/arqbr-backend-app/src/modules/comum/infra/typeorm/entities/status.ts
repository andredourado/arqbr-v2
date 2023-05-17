import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Servico } from '@modules/comum/infra/typeorm/entities/servico'

@Entity('status')
class Status {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Servico, { nullable: true, eager: true })
  @JoinColumn({ name: 'servico_id', referencedColumnName: 'id' })
  servicoId?: string

  @Column({ name: 'sequencia', nullable: true })
  sequencia?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

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

export { Status }
