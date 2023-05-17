import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Unidade } from '@modules/armazenamento/infra/typeorm/entities/unidade'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'

@Entity('posicoes')
class Posicao {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Unidade, { nullable: true, eager: true })
  @JoinColumn({ name: 'unidade_id', referencedColumnName: 'id' })
  unidadeId?: string

  @ManyToOne(() => Planta, { nullable: true, eager: true })
  @JoinColumn({ name: 'planta_id', referencedColumnName: 'id' })
  plantaId?: string

  @Column({ name: 'rua', nullable: true })
  rua?: string

  @Column({ name: 'linha', nullable: true })
  linha?: string

  @Column({ name: 'coluna', nullable: true })
  coluna?: string

  @Column({ name: 'posicoes', nullable: true })
  posicoes?: Number

  @Column({ name: 'posicoes_disponíveis', nullable: true })
  posicoesDisponíveis?: Number

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

export { Posicao }
