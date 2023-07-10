<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class ChangeOriginalAddressLength extends AbstractMigration
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
        $table = $this->table('addresses');

        $table->removeColumn('short_address')->update();

            $table->addColumn('short_address', 'text',[
                'null' => false,
            ])
            ->update();

        $table->save();
    }
}
