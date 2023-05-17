import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'

@Entity('times_coleta')
class TimeColeta {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Coleta, { nullable: true, eager: true })
  @JoinColumn({ name: 'coleta_id', referencedColumnName: 'id' })
  coletaId?: string

  @ManyToOne(() => Pessoa, { nullable: true, eager: true })
  @JoinColumn({ name: 'pessoa_id', referencedColumnName: 'id' })
  pessoaId?: string

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

export { TimeColeta }
