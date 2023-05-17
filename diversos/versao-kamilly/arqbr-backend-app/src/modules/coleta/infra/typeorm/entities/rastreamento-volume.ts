import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

import { Volume } from '@modules/coleta/infra/typeorm/entities/volume'
import { Planta } from '@modules/armazenamento/infra/typeorm/entities/planta'
import { Status } from '@modules/comum/infra/typeorm/entities/status'

@Entity('rastreamento_volumes')
class RastreamentoVolume {
  @PrimaryColumn()
  id?: string

  @ManyToOne(() => Volume, { nullable: true, eager: true })
  @JoinColumn({ name: 'volume_id', referencedColumnName: 'id' })
  volumeId?: string

  @Column({ name: 'data_movimentacao', nullable: true, type: 'timestamptz' })
  dataMovimentacao?: Date

  @Column({ name: 'hora_movimentacao', nullable: true, type: 'timestamptz' })
  horaMovimentacao?: Date

  @ManyToOne(() => Planta, { nullable: true, eager: true })
  @JoinColumn({ name: 'local_de_armazenagem', referencedColumnName: 'id' })
  localDeArmazenagem?: string

  @ManyToOne(() => Status, { nullable: true, eager: true })
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id' })
  statusId?: string

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

export { RastreamentoVolume }
