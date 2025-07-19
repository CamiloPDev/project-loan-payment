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
            <div className="bg-[#0d1117] text-[#c9d1d9] p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-[#58a6ff]">Editar elemento</h2>
                {Object.keys(formData).map(key => (
                    <div key={key} className="mb-4">
                        <label className="block mb-1 text-sm capitalize text-[#8b949e]">{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={formData[key] ?? ''}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-[#161b22] border border-[#30363d] text-[#c9d1d9] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
                        />
                    </div>
                ))}
                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded bg-[#238636] text-white hover:bg-[#2ea043]"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </ModalBase>
    );
}

EditModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};
