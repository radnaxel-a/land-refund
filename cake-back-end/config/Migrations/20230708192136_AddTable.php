<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class AddTable extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     * @return void
     */
    public function change(): void
    {
        $this->table('addresses', ['id' => false, 'primary_key' => ['id']])
        ->addColumn('id', 'uuid', [
            'null' => false,
        ])
        ->addColumn('original_address', 'string', [
            'limit' => 255,
            'null' => false,
        ])
        ->addColumn('short_address', 'string', [
            'limit' => 255,
            'null' => false,
        ])
        ->addIndex(['id'], [
            'unique' => true,
        ])
        ->create();
    }
}
