import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEscala1669034273034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'escalas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'pessoa_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'jornada_id',
            type: 'uuid',
            isNullable: false,
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
            name: 'FKPessoaEscala',
            referencedTableName: 'pessoas',
            referencedColumnNames: ['id'],
            columnNames: ['pessoa_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKJornadaEscala',
            referencedTableName: 'jornadas',
            referencedColumnNames: ['id'],
            columnNames: ['jornada_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('escalas')
  }
}
