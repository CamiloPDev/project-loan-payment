import PropTypes from 'prop-types';

export default function ModalBase({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
            <div className="bg-[#161b22] text-white p-6 rounded-md w-full max-w-md shadow-lg">
                {children}
                <div className="mt-4 text-right">
                    <button
                        onClick={onClose}
                        className="text-sm text-blue-400 hover:underline"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

ModalBase.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};