import "./style.css"
import { FaTimes } from "react-icons/fa";

function Modal ({
    aberto,
    titulo,
    children,
    onFechar
}) {
    if(!aberto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{titulo}</h2>

                    <button
                        className="modal-close"
                        onClick={onFechar}
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