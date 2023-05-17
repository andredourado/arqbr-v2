import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCampoDocumento1669034273020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'campos_documento',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'versao_documento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nome_campo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'identificador',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'canto_superior_x',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'canto_superior_y',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'canto_inferior_x',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'canto_inferior_y',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'conteudo_para_validacao',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pessoa_id',
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
            name: 'FKVersaoDocumentoCampoDocumento',
            referencedTableName: 'versoes_documento',
            referencedColumnNames: ['id'],
            columnNames: ['versao_documento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPessoaCampoDocumento',
            referencedTableName: 'pessoas',
            referencedColumnNames: ['id'],
            columnNames: ['pessoa_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          }
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('campos_documento')
  }
}
