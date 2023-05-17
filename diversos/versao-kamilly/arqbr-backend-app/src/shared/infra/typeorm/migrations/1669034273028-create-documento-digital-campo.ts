import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDocumentoDigitalCampo1669034273028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'documentos_digitais_campos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'documento_digital_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'campo_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'conteudo',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'indice_qualidade_extracao',
            type: 'decimal',
            isNullable: true,
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
            name: 'FKDocumentoDigitalDocumentoDigitalCampo',
            referencedTableName: 'documentos_digitais',
            referencedColumnNames: ['id'],
            columnNames: ['documento_digital_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCampoDocumentoDocumentoDigitalCampo',
            referencedTableName: 'campos',
            referencedColumnNames: ['id'],
            columnNames: ['campo_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKPessoaDocumentoDigitalCampo',
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
    await queryRunner.dropTable('documentos_digitais_campos')
  }
}
