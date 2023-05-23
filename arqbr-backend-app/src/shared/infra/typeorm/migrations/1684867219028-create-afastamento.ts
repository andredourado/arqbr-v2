import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAfastamento1684867219028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'afastamentos',
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
            name: 'tipo_afastamento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'inicio',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'fim',
            type: 'date',
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
            name: 'FKPessoaAfastamentoPessoaId',
            referencedTableName: 'pessoas',
            referencedColumnNames: ['id'],
            columnNames: ['pessoa_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKTipoAfastamentoAfastamentoTipoAfastamentoId',
            referencedTableName: 'tipos_afastamento',
            referencedColumnNames: ['id'],
            columnNames: ['tipo_afastamento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('afastamentos')
  }
}
