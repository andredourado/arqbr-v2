import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDocumentoDigital1669034273021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documentos_digitais',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'data_digitalizacao',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'versao_documento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'nip',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'conteudo_qr_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nome_arquivo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'conteudo_em_texto',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'pessoa_id',
            type: 'uuid',
            isNullable: false,
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
            name: 'FKVersaoDocumentoDocumentoDigital',
            referencedTableName: 'versoes_documento',
            referencedColumnNames: ['id'],
            columnNames: ['versao_documento_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPessoaDocumentoDigital',
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
    await queryRunner.dropTable('documentos_digitais')
  }
}
