import "./style.css"
import { FaTimes } from "react-icons/fa";

function Modal ({
    isOpen,
    title,
    children,
    onClose
}) {
    if(!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;