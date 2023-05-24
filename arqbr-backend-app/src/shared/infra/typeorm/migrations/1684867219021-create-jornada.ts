import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateJornada1684867219021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'jornadas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'descricao',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'seg_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'seg_segunda_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ter_segunda_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qua_segunda_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qui_segunda_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex_segunda_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sab_segunda_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_primeira_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_primeira_fim',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_segunda_inicio',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dom_segunda_fim',
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
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('jornadas')
  }
}
