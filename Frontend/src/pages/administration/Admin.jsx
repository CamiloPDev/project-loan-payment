import './Admin.css'
import { Link } from "react-router-dom";
import { useFetchApiLoan } from '../../hooks/useFetchApiLoan';
import TableAdmin from '../../components/tableAdmin/table';
import Nav from '../../components/nav/nav';

export default function AdminPage() {
    const { data: dataBorrower } = useFetchApiLoan('api/borrowers');
    const { data: dataStatusBorrower } = useFetchApiLoan('api/status/borrower');
    const { data: dataStatusLoan } = useFetchApiLoan('api/status/loan');
    const { data: dataLoan } = useFetchApiLoan('api/loans');
    const { data: dataPayment } = useFetchApiLoan('api/payments');

    return (
        <>
            <Nav />
            <Link to='../'>
                <h2>Volver al inicio</h2>
            </Link>

            <div className='flex gap-4 items-start'>
                <div>
                    <TableAdmin
                        title="Get Loan"
                        data={dataLoan}
                        columns={[
                            { header: 'id', accessor: 'id' },
                            { header: 'borrowerId', accessor: 'borrowerId' },
                            { header: 'loanAmount', accessor: 'loanAmount' },
                            { header: 'interestRate', accessor: 'interestRate' },
                            { header: 'date', accessor: 'date' },
                            { header: 'dueDate', accessor: 'dueDate' },
                            { header: 'loanStatusId', accessor: 'loanStatusId' },
                        ]}
                        onEdit={(row) => {
                            console.log("Editar:", row);
                            // Aquí puedes abrir un modal o redirigir a una página de edición
                        }}
                        onDelete={(id) => {
                            console.log("Eliminar ID:", id);
                            // Aquí puedes hacer un fetch DELETE al backend
                        }}
                    />
                    <TableAdmin
                        title="Get Payment"
                        data={dataPayment}
                        columns={[
                            { header: 'id', accessor: 'id' },
                            { header: 'loanId', accessor: 'loanId' },
                            { header: 'principalPayment', accessor: 'principalPayment' },
                            { header: 'interestPayment', accessor: 'interestPayment' },
                            { header: 'date', accessor: 'date' },
                        ]}
                        onEdit={(row) => {
                            console.log("Editar:", row);
                            // Aquí puedes abrir un modal o redirigir a una página de edición
                        }}
                        onDelete={(id) => {
                            console.log("Eliminar ID:", id);
                            // Aquí puedes hacer un fetch DELETE al backend
                        }}
                    />
                </div>
                <div>
                    <TableAdmin
                        title="Get Borrowers"
                        data={dataBorrower}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Name', accessor: 'firstName' },
                            { header: 'Last Name', accessor: 'lastName' },
                            { header: 'Phone', accessor: 'phone' },
                            { header: 'Status ID', accessor: 'borrowerStatusId' },
                        ]}
                        onEdit={(row) => {
                            console.log("Editar:", row);
                            // Aquí puedes abrir un modal o redirigir a una página de edición
                        }}
                        onDelete={(id) => {
                            console.log("Eliminar ID:", id);
                            // Aquí puedes hacer un fetch DELETE al backend
                        }}
                    />
                    <TableAdmin
                        title="Get Status Borrower"
                        data={dataStatusBorrower}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Status', accessor: 'status' },
                            { header: 'Description', accessor: 'description' },
                        ]}
                        onEdit={(row) => {
                            console.log("Editar:", row);
                            // Aquí puedes abrir un modal o redirigir a una página de edición
                        }}
                        onDelete={(id) => {
                            console.log("Eliminar ID:", id);
                            // Aquí puedes hacer un fetch DELETE al backend
                        }}
                    />
                    <TableAdmin
                        title="Get Status Loan"
                        data={dataStatusLoan}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Status', accessor: 'status' },
                            { header: 'Description', accessor: 'description' },
                        ]}
                        onEdit={(row) => {
                            console.log("Editar:", row);
                            // Aquí puedes abrir un modal o redirigir a una página de edición
                        }}
                        onDelete={(id) => {
                            console.log("Eliminar ID:", id);
                            // Aquí puedes hacer un fetch DELETE al backend
                        }}
                    />
                </div>
            </div>

        </>
    )
}
