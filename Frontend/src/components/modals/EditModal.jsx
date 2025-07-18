import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalBase from './ModalBase';

export default function EditModal({ isOpen, onClose, data, onSave }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Editar elemento</h2>
            {Object.keys(formData).map(key => (
                <div key={key} className="mb-3">
                    <label className="block mb-1 text-sm capitalize">{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key] ?? ''}
                        onChange={handleChange}
                        className="w-full p-2 text-black rounded"
                    />
                </div>
            ))}
            <button
                onClick={handleSubmit}
                className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mt-2"
            >
                Guardar
            </button>
        </ModalBase>
    );
}

EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};