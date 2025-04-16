import React, { useEffect, useState } from 'react';
import api from '../services/api';
import PrestatariosTable from '../components/PrestatariosTable';

export default function PrestatariosPage() {
  const [prestatarios, setPrestatarios] = useState([]);

  useEffect(() => {
    api.get('/borrowers')
      .then(res => setPrestatarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Prestatarios</h2>
      <PrestatariosTable prestatarios={prestatarios} />
    </div>
  );
}
