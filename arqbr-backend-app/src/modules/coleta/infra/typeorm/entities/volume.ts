import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Coleta } from '@modules/coleta/infra/typeorm/entities/coleta'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'

@Entity('volumes')
class Volume {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Coleta, { nullable: true, eager: true })
  @JoinColumn({ name: 'coleta_id', referencedColumnName: 'id' })
  coletaId?: string

  @Column({ name: 'identificador', nullable: true })
  identificador?: string

  @Column({ name: 'arquivo_foto', nullable: true })
  arquivoFoto?: string

  @Column({ name: 'comentario', nullable: true })
  comentario?: string

  @ManyToOne(() => Planta, { nullable: true, eager: true })
  @JoinColumn({ name: 'local_de_armazenagem', referencedColumnName: 'id' })
  localDeArmazenagem?: string

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

export { Volume }
