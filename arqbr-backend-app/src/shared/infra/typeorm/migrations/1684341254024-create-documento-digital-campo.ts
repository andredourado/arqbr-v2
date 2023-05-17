import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateDocumentoDigitalCampo1684341254024 implements MigrationInterface {
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
            name: 'campo_documento_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'conteudo',
            type: 'varchar',
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
            name: 'FKDocumentoDigitalDocumentoDigitalCampoDocumentoDigitalId',
            referencedTableName: 'documentos_digitais',
            referencedColumnNames: ['id'],
            columnNames: ['documento_digital_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FKCampoDocumentoDocumentoDigitalCampoCampoDocumentoId',
            referencedTableName: 'campos_documento',
            referencedColumnNames: ['id'],
            columnNames: ['campo_documento_id'],
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
