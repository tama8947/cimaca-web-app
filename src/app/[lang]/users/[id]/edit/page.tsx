'use client';

import { InputText } from 'primereact/inputtext';

export default function createUsersPage () {
  return <main>
    <div className="card p-fluid">
      <h5>Editar Usuario</h5>
      <div className="formgrid grid">
        <div className="field col">
          <label htmlFor="name2">Name</label>
          <InputText id="name2" type="text" className='p-inputtext-sm'/>
        </div>
        <div className="field col">
          <label htmlFor="email2">Email</label>
          <InputText id="email2" type="text" className='p-inputtext-sm'/>
        </div>
      </div>
    </div>
  </main>;
}
