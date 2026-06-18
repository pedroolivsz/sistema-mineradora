import { NavLink } from "react-router-dom"
import "./style.css"

function Menu() {
    return (
        <aside className="menu">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/cidades"}>Cidades</NavLink>
            <NavLink to={"/funcionarios"}>Funcionarios</NavLink>
            <NavLink to={"/equipamentos"}>Equipamentos</NavLink>
            <NavLink to={"/servicos"}>Serviços</NavLink>
        </aside>
    )
}

export default Menu;