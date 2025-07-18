import './Admin.css'
import { useFetchApiLoan } from '../../hooks/useFetchApiLoan';
import { useState } from 'react';
import TableAdmin from '../../components/tableAdmin/table';
import EditModal from '../../components/modals/EditModal';
import CreateModal from '../../components/modals/CreateModal';
import ConfirmDeleteModal from '../../components/modals/ConfirmDeleteModal';
import Nav from '../../components/nav/nav';

export default function AdminPage() {
    const { data: dataBorrower } = useFetchApiLoan('api/borrowers');
    const { data: dataStatusBorrower } = useFetchApiLoan('api/status/borrower');
    const { data: dataStatusLoan } = useFetchApiLoan('api/status/loan');
    const { data: dataLoan } = useFetchApiLoan('api/loans');
    const { data: dataPayment } = useFetchApiLoan('api/payments');

    const [editData, setEditData] = useState(null);
    const [createType, setCreateType] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleEdit = (row) => {
        setEditData(row);
        setOpenEdit(true);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setOpenDelete(true);
    };

    const handleCreate = (type) => {
        setCreateType(type);
        setOpenCreate(true);
    };

    const handleSaveEdit = (newData) => {
        console.log("Guardar cambios:", newData);
        // aquí llamas al backend (PUT)
    };

    const handleConfirmDelete = () => {
        console.log("Eliminar ID:", deleteId);
        setOpenDelete(false);
        // aquí llamas al backend (DELETE)
    };

    return (
        <>
            <Nav />
            <div className='flex gap-4 items-start'>
                <div>
                    <TableAdmin
                        title="Loans"
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
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <TableAdmin
                        title="Payments"
                        data={dataPayment}
                        columns={[
                            { header: 'id', accessor: 'id' },
                            { header: 'loanId', accessor: 'loanId' },
                            { header: 'principalPayment', accessor: 'principalPayment' },
                            { header: 'interestPayment', accessor: 'interestPayment' },
                            { header: 'date', accessor: 'date' },
                        ]}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
                <div>
                    <TableAdmin
                        title="Borrowers"
                        data={dataBorrower}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Name', accessor: 'firstName' },
                            { header: 'Last Name', accessor: 'lastName' },
                            { header: 'Phone', accessor: 'phone' },
                            { header: 'Status ID', accessor: 'borrowerStatusId' },
                        ]}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <TableAdmin
                        title="Status Borrower"
                        data={dataStatusBorrower}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Status', accessor: 'status' },
                            { header: 'Description', accessor: 'description' },
                        ]}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                    <TableAdmin
                        title="Status Loan"
                        data={dataStatusLoan}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Status', accessor: 'status' },
                            { header: 'Description', accessor: 'description' },
                        ]}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
            <EditModal
                isOpen={openEdit}
                onClose={() => setOpenEdit(false)}
                data={editData}
                onSave={handleSaveEdit}
            />
            <CreateModal
                isOpen={openCreate}
                onClose={() => setOpenCreate(false)}
                type={createType}
                onSave={(newData) => {
                    console.log('Crear nuevo:', newData);
                    // aquí llamas al backend (POST)
                }}
            />

            <ConfirmDeleteModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
            />

        </>
    )
}
