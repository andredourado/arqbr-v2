import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { DocumentoDigital } from '@modules/digitalizacao/infra/typeorm/entities/documento-digital'
import { CampoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/campo-documento'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'

@Entity('documentos_digitais_campos')
class DocumentoDigitalCampo {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => DocumentoDigital, { nullable: true, eager: true })
  @JoinColumn({ name: 'documento_digital_id', referencedColumnName: 'id' })
  documentoDigitalId?: string

  @ManyToOne(() => CampoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'campo_id', referencedColumnName: 'id' })
  campoId?: string

  @Column({ name: 'conteudo', nullable: true })
  conteudo?: string

  @Column({ name: 'indice_qualidade_extracao', nullable: true })
  indiceQualidadeExtracao?: Number

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

export { DocumentoDigitalCampo }
