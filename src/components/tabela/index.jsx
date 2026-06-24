import { FaEdit, FaTrash } from "react-icons/fa";
import "./style.css";

function Tabela({
    colunas = [],
    dados = [],
    onEditar,
    onExcluir
 }) {
    return( 
        <div className="table-container"> 
            <table className="table"> 
                <thead> 
                    <tr>
                        {colunas.map((coluna) => ( <th key={coluna.accessor}>
                        {coluna.header} </th>
                        ))}
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {dados.length > 0 ? (
                        dados.map((item) => (
                            <tr key={item.id}>
                                {colunas.map((coluna) => (
                                    <td key={coluna.accessor}>
                                        {item[coluna.accessor]}
                                    </td>
                                ))}

                                <td className="actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() =>
                                            onEditar(item.id)
                                        }
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() =>
                                            onExcluir(item.id)
                                        }
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={
                                    colunas.length + 1
                                }
                                className="empty"
                            >
                                Nenhum registro encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Tabela;
