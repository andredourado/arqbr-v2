import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePessoa1684867219019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'unidade_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'funcao_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'gerente',
            type: 'boolean',
            default: false,
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
            name: 'FKUnidadePessoaUnidadeId',
            referencedTableName: 'unidades',
            referencedColumnNames: ['id'],
            columnNames: ['unidade_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKFuncaoPessoaFuncaoId',
            referencedTableName: 'funcoes',
            referencedColumnNames: ['id'],
            columnNames: ['funcao_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pessoas')
  }
}
