import PropTypes from 'prop-types';

export default function TableView({ title, data, columns }) {
    return (
        <div className="bg-[#0d1117] text-white p-6 overflow-auto">
            <h1 className="text-2xl font-semibold text-[#c9d1d9] mb-4 border-b border-[#238636] pb-2">{title}</h1>
            <div className="w-full rounded-xs overflow-x-auto">
                <table className="w-full text-sm text-left border border-[#30363d] rounded-md">
                    <thead className="bg-[#161b22] text-[#8b949e] uppercase tracking-wider">
                        <tr>
                            {columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-3 border-b border-[#30363d]">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr key={row.id || rowIndex} className="hover:bg-[#21262d]">
                                    {columns.map((col, colIndex) => (
                                        <td key={colIndex} className="px-4 py-2 border-b border-[#30363d] text-[#c9d1d9]">
                                            {row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-3 text-center text-[#8b949e]"
                                >
                                    No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TableView.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired
        })
    ).isRequired
};
