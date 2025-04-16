import React from 'react';

export default function PrestatariosTable({ prestatarios }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Teléfono</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {prestatarios.map(p => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.nombres}</td>
            <td>{p.apellidos}</td>
            <td>{p.telefono}</td>
            <td>{p.estado || '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
