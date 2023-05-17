import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFrequenciaColeta1684341254031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'frequencia_coletas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'cliente_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'dias_do_mes',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_horario_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_horario_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'desabilitado',
            type: 'boolean',
            default: false,
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKClienteFrequenciaColetaClienteId',
            referencedTableName: 'clientes',
            referencedColumnNames: ['id'],
            columnNames: ['cliente_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('frequencia_coletas')
  }
}
