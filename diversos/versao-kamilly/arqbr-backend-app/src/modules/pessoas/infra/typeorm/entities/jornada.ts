import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'


@Entity('jornadas')
class Jornada {
  @PrimaryColumn()
  id?: string

  @Column({ name: 'descricao', nullable: true })
  descricao?: string

  @Column({ name: 'seg_primeira_inicio', nullable: true })
  segPrimeiraInicio?: string

  @Column({ name: 'seg_primeira_fim', nullable: true })
  segPrimeiraFim?: string

  @Column({ name: 'seg_segunda_inicio', nullable: true })
  segSegundaInicio?: string

  @Column({ name: 'seg_segunda_fim', nullable: true })
  segSegundaFim?: string

  @Column({ name: 'ter_primeira_inicio', nullable: true })
  terPrimeiraInicio?: string

  @Column({ name: 'ter_primeira_fim', nullable: true })
  terPrimeiraFim?: string

  @Column({ name: 'ter_segunda_inicio', nullable: true })
  terSegundaInicio?: string

  @Column({ name: 'ter_segunda_fim', nullable: true })
  terSegundaFim?: string

  @Column({ name: 'qua_primeira_inicio', nullable: true })
  quaPrimeiraInicio?: string

  @Column({ name: 'qua_primeira_fim', nullable: true })
  quaPrimeiraFim?: string

  @Column({ name: 'qua_segunda_inicio', nullable: true })
  quaSegundaInicio?: string

  @Column({ name: 'qua_segunda_fim', nullable: true })
  quaSegundaFim?: string

  @Column({ name: 'qui_primeira_inicio', nullable: true })
  quiPrimeiraInicio?: string

  @Column({ name: 'qui_primeira_fim', nullable: true })
  quiPrimeiraFim?: string

  @Column({ name: 'qui_segunda_inicio', nullable: true })
  quiSegundaInicio?: string

  @Column({ name: 'qui_segunda_fim', nullable: true })
  quiSegundaFim?: string

  @Column({ name: 'sex_primeira_inicio', nullable: true })
  sexPrimeiraInicio?: string

  @Column({ name: 'sex_primeira_fim', nullable: true })
  sexPrimeiraFim?: string

  @Column({ name: 'sex_segunda_inicio', nullable: true })
  sexSegundaInicio?: string

  @Column({ name: 'sex_segunda_fim', nullable: true })
  sexSegundaFim?: string

  @Column({ name: 'sab_primeira_inicio', nullable: true })
  sabPrimeiraInicio?: string

  @Column({ name: 'sab_primeira_fim', nullable: true })
  sabPrimeiraFim?: string

  @Column({ name: 'sab_segunda_inicio', nullable: true })
  sabSegundaInicio?: string

  @Column({ name: 'sab_segunda_fim', nullable: true })
  sabSegundaFim?: string

  @Column({ name: 'dom_primeira_inicio', nullable: true })
  domPrimeiraInicio?: string

  @Column({ name: 'dom_primeira_fim', nullable: true })
  domPrimeiraFim?: string

  @Column({ name: 'dom_segunda_inicio', nullable: true })
  domSegundaInicio?: string

  @Column({ name: 'dom_segunda_fim', nullable: true })
  domSegundaFim?: string

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

export { Jornada }
