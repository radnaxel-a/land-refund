<?php
declare(strict_types=1);

namespace App\Controller\Component;

use Cake\Controller\Component;
use Crud\Controller\Component\CrudComponent;

/**
 * CrudLoader component
 */
class CrudLoaderComponent extends Component
{
    /**
     * Default configuration.
     *
     * @var array
     */
    protected $_defaultConfig = [
        'flashMessages' => [
            'success_class' => 'alert alert-success alert-dismissible',
            'error_class' => 'alert alert-danger alert-dismissible',
            'warning_class' => 'alert alert-warning alert-dismissible',
        ],
    ];

    /**
     * Constructor hook method.
     *
     * Implement this method to avoid having to overwrite
     * the constructor and call parent.
     *
     * @param array $config The configuration settings provided to this component.
     * @return void
     */
    public function initialize(array $config): void
    {
        parent::initialize($config);

        if (empty($this->getConfig('listeners'))) {
            $this->setConfig('listeners', [
                'Crud.Api',
                'Crud.ApiPagination',
                'Crud.ApiQueryLog',
                'Crud.Redirect',
                'Crud.RelatedModels',
            ]);
        }

        $this->getController()->loadComponent('Crud.Crud', [
            'actions' => [
                'index' => [
                    'className' => 'Crud.Index',
                    'relatedModels' => false,
                ],
                'add' => [
                    'className' => 'Crud.Add',
                    'relatedModels' => false,
                ],
                'edit' => [
                    'className' => 'Crud.Edit',
                    'relatedModels' => false,
                ],
                'view' => [
                    'className' => 'Crud.View',
                    'relatedModels' => false,
                ],
                'delete' => [
                    'className' => 'Crud.Delete',
                    'relatedModels' => false,
                ],
            ],
            'listeners' => $this->getConfig('listeners'),
        ]);
    }

    /**
     * @throws \Crud\Error\Exception\MissingActionException
     * @throws \Crud\Error\Exception\ActionNotConfiguredException
     * @throws \RuntimeException
     */
    public function enableDefaultCrudActions(): void
    {
        $crudComponent = $this->getController()->components()->get('Crud');

        if (!($crudComponent instanceof CrudComponent)) {
            throw new \RuntimeException('Crud component is not loaded');
        }

        $crudComponent->enable(['view', 'index', 'add', 'edit', 'delete']);
    }
}
