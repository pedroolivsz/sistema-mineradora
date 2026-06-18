import { NavLink } from "react-router-dom"

import {
    FaHome,
    FaCity,
    FaUsers,
    FaTools,
    FaClipboardList
} from "react-icons/fa"

import "./style.css"

function Menu() {
    const links = [
        {
            path:"/",
            label: "Home",
            icon: <FaHome />
        },
        {
            path:"/cidades",
            label: "Cidades",
            icon: <FaCity />
        },
        {
            path:"/funcionarios",
            label: "Funcionarios",
            icon: <FaUsers />
        },
        {
            path:"/equipamentos",
            label: "Equipamentos",
            icon: <FaTools />
        },
        {
            path:"/servicos",
            label: "Serviços",
            icon: <FaClipboardList />
        }
    ]
    return (
        <aside className="menu">
            <div className="menu-logo">
                <h2>Mineração</h2>
            </div>

            <nav className="menu-nav">
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        className={({ isActive }) => 
                            isActive
                                ? "menu-link active"
                                : "menu-link"
                        }
                    >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default Menu;