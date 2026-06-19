import "./style.css"

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <span>© {currentYear} Sistema de Gestão para Mineração</span>
                <span>
                    Versão 1.0.0
                </span>
            </div>
            
            
        </footer>
    );
}

export default Footer;