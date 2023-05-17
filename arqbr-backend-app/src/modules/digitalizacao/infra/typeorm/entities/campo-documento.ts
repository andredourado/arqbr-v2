import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { TipoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/tipo-documento'

@Entity('campos_documento')
class CampoDocumento {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => TipoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'tipo_documento_id', referencedColumnName: 'id' })
  tipoDocumentoId?: string

  @Column({ name: 'nome_campo', nullable: true })
  nomeCampo?: string

  @Column({ name: 'titulo', nullable: true })
  titulo?: string

  @Column({ name: 'metodo_extracao', nullable: true })
  metodoExtracao?: string

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

export { CampoDocumento }
