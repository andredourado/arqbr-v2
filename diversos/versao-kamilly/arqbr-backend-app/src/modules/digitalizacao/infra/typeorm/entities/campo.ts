import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'
import { VersaoDocumento } from './versao-documento'

@Entity('campos')
class Campo {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => VersaoDocumento, { nullable: true, eager: true })
  @JoinColumn({ name: 'versao_documento_id', referencedColumnName: 'id' })
  versaoDocumentoId?: string

  @Column({ name: 'page', nullable: true })
  page?: number

  @Column({ name: 'name', nullable: true })
  name?: string

  @Column({ name: 'start_x', nullable: true })
  startX?: number

  @Column({ name: 'start_y', nullable: true })
  startY?: number

  @Column({ name: 'end_x', nullable: true })
  endX?: number

  @Column({ name: 'end_y', nullable: true })
  endY?: number

  @Column({ name: 'linha', nullable: true })
  linha?: string

  @Column({ name: 'coluna', nullable: true })
  coluna?: string

  @Column({ name: 'resultado_esperado', nullable: true })
  resultadoEsperado?: string

  @Column({ name: 'complemento', nullable: true })
  complemento?: string

  @Column({ name: 'mascara', nullable: true })
  mascara?: string

  @Column({ name: 'comprimento', nullable: true })
  comprimento?: number

  @Column({ name: 'ocorrencia', nullable: true })
  ocorrencia?: string

  @Column({ name: 'referencia', nullable: true })
  referencia?: string

  @Column({ name: 'localizacao', nullable: true })
  localizacao?: string

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

export { Campo }
