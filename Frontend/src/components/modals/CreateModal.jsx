
import { useState } from 'react';
import ModalBase from './ModalBase';

export default function CreateModal({ isOpen, onClose, type, onSave }) {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Crear nuevo {type}</h2>
            {/* Puedes personalizar estos campos según el tipo */}
            {['campo1', 'campo2', 'campo3'].map((field) => (
                <div key={field} className="mb-3">
                    <label className="block mb-1 text-sm capitalize">{field}</label>
                    <input
                        type="text"
                        name={field}
                        value={formData[field] ?? ''}
                        onChange={handleChange}
                        className="w-full p-2 text-black rounded"
                    />
                </div>
            ))}
            <button
                onClick={handleSubmit}
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 mt-2"
            >
                Crear
            </button>
        </ModalBase>
    );
}