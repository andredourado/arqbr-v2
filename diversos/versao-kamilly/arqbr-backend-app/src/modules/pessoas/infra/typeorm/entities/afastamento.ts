import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'
import { TipoAfastamento } from '@modules/comum/infra/typeorm/entities/tipo-afastamento'

@Entity('afastamentos')
class Afastamento {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Pessoa, { nullable: true, eager: true })
  @JoinColumn({ name: 'pessoa_id', referencedColumnName: 'id' })
  pessoaId?: string

  @ManyToOne(() => TipoAfastamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'tipo_afastamento_id', referencedColumnName: 'id' })
  tipoAfastamentoId?: string

  @Column({ name: 'inicio', nullable: true, type: 'timestamptz' })
  inicio?: Date

  @Column({ name: 'fim', nullable: true, type: 'timestamptz' })
  fim?: Date

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

export { Afastamento }
