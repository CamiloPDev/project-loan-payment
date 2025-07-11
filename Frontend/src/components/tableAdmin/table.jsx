import PropTypes from 'prop-types';

export default function TableAdmin({ title, data, columns, onEdit, onDelete }) {
    return (
        <div className='card-crud'>
            <h1>{title}</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx}>{col.header}</th>
                            ))}
                            {(onEdit || onDelete) && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            data.map((row, rowIndex) => (
                                <tr key={row.id || rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex}>{row[col.accessor]}</td>
                                    ))}
                                    {(onEdit || onDelete) && (
                                        <td>
                                            {onEdit && (
                                                <button onClick={() => onEdit(row)}>Editar</button>
                                            )}
                                            {onDelete && (
                                                <button onClick={() => onDelete(row.id)}>Eliminar</button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length}>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TableAdmin.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired
        })
    ).isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};