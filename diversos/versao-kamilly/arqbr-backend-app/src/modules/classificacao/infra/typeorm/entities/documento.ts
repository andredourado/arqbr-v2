import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { TipoDocumento } from '@modules/clientes/infra/typeorm/entities/tipo-documento'
import { Status } from '@modules/comum/infra/typeorm/entities/status'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'

@Entity('documentos')
class Documento {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Cliente, { nullable: true, eager: true })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  clienteId?: string

  @ManyToOne(() => Contrato, { nullable: true, eager: true })
  @JoinColumn({ name: 'contrato_id', referencedColumnName: 'id' })
  contratoId?: string

  @ManyToOne(() => Departamento, { nullable: true, eager: true })
  @JoinColumn({ name: 'departamento_id', referencedColumnName: 'id' })
  departamentoId?: string

  @ManyToOne(() => TipoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'tipo_documento_id', referencedColumnName: 'id' })
  tipoDocumentoId?: string

  @Column({ name: 'nip', nullable: true })
  nip?: string

  @Column({ name: 'caixa_arqbr', nullable: true })
  caixaArqbr?: string

  @Column({ name: 'conteudo_qr_code', nullable: true })
  conteudoQrCode?: string

  @ManyToOne(() => Status, { nullable: true, eager: true })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  statusId?: string

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

export { Documento }
