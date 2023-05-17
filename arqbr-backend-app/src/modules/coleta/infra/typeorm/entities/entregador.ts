import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('entregadores')
class Entregador {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'cpf_cnpj', nullable: true })
  cpfCnpj?: string

  @Column({ name: 'nome', nullable: true })
  nome?: string

  @Column({ name: 'email', nullable: true })
  email?: string

  @Column({ name: 'endereco', nullable: true })
  endereco?: string

  @Column({ name: 'numero', nullable: true })
  numero?: string

  @Column({ name: 'complemento', nullable: true })
  complemento?: string

  @Column({ name: 'cep', nullable: true })
  cep?: string

  @Column({ name: 'telefones_fixos', nullable: true })
  telefonesFixos?: string

  @Column({ name: 'celular', nullable: true })
  celular?: string

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

export { Entregador }
