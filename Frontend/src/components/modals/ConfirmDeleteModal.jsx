import PropTypes from 'prop-types';
import ModalBase from './ModalBase';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">¿Estás seguro de eliminar este elemento?</h2>
            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                    Eliminar
                </button>
            </div>
        </ModalBase>
    );
}

ConfirmDeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
}