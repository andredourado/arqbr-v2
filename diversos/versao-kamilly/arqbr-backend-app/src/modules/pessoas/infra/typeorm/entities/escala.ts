import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { Jornada } from '@modules/pessoas/infra/typeorm/entities/jornada'

@Entity('escalas')
class Escala {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Pessoa, { nullable: true, eager: true })
  @JoinColumn({ name: 'pessoa_id', referencedColumnName: 'id' })
  pessoaId?: string

  @ManyToOne(() => Jornada, { nullable: true, eager: true })
  @JoinColumn({ name: 'jornada_id', referencedColumnName: 'id' })
  jornadaId?: string

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

export { Escala }
