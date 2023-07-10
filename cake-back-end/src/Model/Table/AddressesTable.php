<?php
namespace App\Model\Table;

use Cake\ORM\Table;
use Model\Entity\Address;
use Cake\Validation\Validator;
use App\Model\Table\Event;
use Cake\Event\EventInterface;
use Cake\Datasource\EntityInterface;
use Cake\ORM\Query;

class AddressesTable extends Table
{
    public function initialize(array $config): void
    {
        parent::initialize($config);

        $this->setTable('addresses');
        $this->setPrimaryKey('id');
    }

    public function validationDefault(Validator $validator): Validator
    {
        $validator
            ->uuid('id')
            ->allowEmptyString('id', null, 'create');

        $validator
            ->url('original_address')
            ->requirePresence('original_address', 'create')
            ->notEmpty('original_address');

        return $validator;
    }

    public function beforeSave(EventInterface $event, EntityInterface $entity)
    {
        $entity->short_address = $this->generateShortUrl();
        
        return true;
    }

    private function generateShortUrl(): string 
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        
        for ($i = 0; $i < 8; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }

        return $randomString;
    }
}
