import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'

@Entity('solicitantes')
class Solicitante {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @Column({ name: 'email', nullable: true })
  email?: string

  @Column({ name: 'telefones_fixos', nullable: true })
  telefonesFixos?: string

  @Column({ name: 'celular', nullable: true })
  celular?: string

  @Column({ name: 'gerente_departamento', nullable: true, default: false })
  gerenteDepartamento?: boolean

  @Column({ name: 'gestor_contrato', nullable: true, default: false })
  gestorContrato?: boolean

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

export { Solicitante }
