import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalBase from './ModalBase';

export default function CreateModal({ isOpen, onClose, fields, onSave, title }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (isOpen) {
            const initialData = {};
            fields.forEach(field => {
                initialData[field] = '';
            });
            setFormData(initialData);
        }
    }, [isOpen, fields]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">{title}</h2>

            {fields.map((field) => (
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

CreateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSave: PropTypes.func.isRequired,
    title: PropTypes.string,
};
