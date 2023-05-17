import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { VersaoDocumento } from '@modules/digitalizacao/infra/typeorm/entities/versao-documento'
import { Pessoa } from '@modules/pessoas/infra/typeorm/entities/pessoa'

@Entity('campos_documento')
class CampoDocumento {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => VersaoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'versao_documento_id', referencedColumnName: 'id' })
  versaoDocumentoId?: string

  @Column({ name: 'nome_campo', nullable: true })
  nomeCampo?: string

  @Column({ name: 'identificador', nullable: true })
  identificador?: string

  @Column({ name: 'canto_superior_x', nullable: true })
  cantoSuperiorX?: Number

  @Column({ name: 'canto_superior_y', nullable: true })
  cantoSuperiorY?: Number

  @Column({ name: 'canto_inferior_x', nullable: true })
  cantoInferiorX?: Number

  @Column({ name: 'canto_inferior_y', nullable: true })
  cantoInferiorY?: Number

  @Column({ name: 'conteudo_para_validacao', nullable: true })
  conteudoParaValidacao?: string

  @ManyToOne(() => Pessoa, { nullable: true, eager: true })
  @JoinColumn({ name: 'pessoa_id', referencedColumnName: 'id' })
  pessoaId?: string

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
