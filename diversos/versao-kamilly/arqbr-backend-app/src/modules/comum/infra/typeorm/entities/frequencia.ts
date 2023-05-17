import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('frequencias')
class Frequencia {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

  @Column({ name: 'espaco_em_dias', nullable: true })
  espacoEmDias?: Number

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

export { Frequencia }
