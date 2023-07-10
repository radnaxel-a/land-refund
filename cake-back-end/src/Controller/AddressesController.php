<?php
declare(strict_types=1);

namespace App\Controller;

/**
 * Addresses Controller
 *
 * @method \App\Model\Entity\Address[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class AddressesController extends AppController
{

    public function initialize(): void
    {
        parent::initialize();

        $this->Crud->disable(['edit', 'delete']);
    } 

    /**
     * Index method
     *
     * @return \Cake\Http\Response|null|void Renders view
     */
    public function index()
    {
        return $this->Crud->execute();
    }

    public function view($id)
    {
        return $this->Crud->execute();
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        return $this->Crud->execute();
    }

    public function search()
    {
        $this->getRequest()->allowMethod(['GET']);

        $short_url_address = $this->request->getQuery('short_url');
        $address = $this->Addresses
            ->find()
            ->where(['short_address =' => $short_url_address])
            ->firstOrFail();

        $this->set([
            'success' => true,
            'data' => $address
        ]);
        $this->viewBuilder()->setOption('serialize', true);
        $this->RequestHandler->renderAs($this, 'json');
    }
}
