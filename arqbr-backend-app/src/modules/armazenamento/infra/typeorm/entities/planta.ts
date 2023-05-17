import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'

@Entity('plantas')
class Planta {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Unidade, { nullable: true, eager: true })
  @JoinColumn({ name: 'unidade_id', referencedColumnName: 'id' })
  unidadeId?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @Column({ name: 'quantidade_posicoes', nullable: true })
  quantidadePosicoes?: Number

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

export { Planta }
