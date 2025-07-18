import PropTypes from 'prop-types';
import ModalBase from './ModalBase';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
    return (
        <ModalBase isOpen={isOpen} onClose={onClose}>
            <div className="bg-[#0d1117] text-[#c9d1d9] p-6 rounded shadow-lg">
                <h2 className="text-xl font-semibold mb-6 text-[#58a6ff]">
                    ¿Estás seguro de eliminar este elemento?
                </h2>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d]"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-[#da3633] text-white hover:bg-[#f85149]"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </ModalBase>
    );
}

ConfirmDeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
