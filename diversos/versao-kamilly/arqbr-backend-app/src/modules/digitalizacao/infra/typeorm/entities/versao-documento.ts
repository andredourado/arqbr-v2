import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Expose } from 'class-transformer'
import { v4 as uuidV4 } from 'uuid'

import { Cliente } from '@modules/clientes/infra/typeorm/entities/cliente'
import { Contrato } from '@modules/clientes/infra/typeorm/entities/contrato'
import { Departamento } from '@modules/clientes/infra/typeorm/entities/departamento'
import { TipoDocumento } from '@modules/clientes/infra/typeorm/entities/tipo-documento'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'

@Entity('versoes_documento')
class VersaoDocumento {
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

  @Column({ name: 'descricao_versao', nullable: true })
  descricaoVersao?: string
  
  @Column({ name: 'qrcode', nullable: true })
  qrcode?: string

  @Column({ name: 'squares', nullable: true, default: false, type: 'json' })
  squares?: object

  @Column({ name: 'file', nullable: true })
  file?: string
  
  @Column({ name: 'page_quantity', nullable: true })
  pageQuantity?: string

  @Column({ name: 'desabilitado', nullable: true, default: false })
  desabilitado?: boolean

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt?: Date

  @Expose({ name: 'fileUrl' })
  fileUrl(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/file/${this.file}`
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/file/${this.file}`
      default:
        return null
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { VersaoDocumento }
