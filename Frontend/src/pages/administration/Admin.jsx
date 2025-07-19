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

    const [editEndpoint, setEditEndpoint] = useState(null);

    const handleEdit = (row, endpoint) => {
        setEditData(row);
        setEditEndpoint(endpoint);
        setOpenEdit(true);
    };

    const handleDelete = (id, endpoint) => {
        setDeleteId({ id, endpoint });
        setOpenDelete(true);
    };

    const handleCreate = (type) => {
        console.log('Creando tipo:', type);
        setCreateType(type);
        setOpenCreate(true);
    };

    const fieldsByType = {
        loans: ['description', 'borrowerId', 'loanAmount', 'interestRate', 'date', 'dueDate', 'loanStatusId'],
        payments: ['description', 'loanId', 'principalPayment', 'interestPayment', 'date'],
        borrowers: ['firstName', 'lastName', 'phone', 'borrowerStatusId'],
        'status/borrower': ['status', 'description'],
        'status/loan': ['status', 'description'],
    };

    const handleSaveEdit = async (newData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/${editEndpoint}/${newData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });

            if (!response.ok) throw new Error('Error al actualizar');
            console.log("Actualización exitosa");
            setOpenEdit(false);
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const { id, endpoint } = deleteId;
            const response = await fetch(`http://localhost:5000/api/${endpoint}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Error al eliminar');
            console.log("Eliminado con éxito");
            setOpenDelete(false);
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
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
                            { header: 'description', accessor: 'description' },
                            { header: 'borrower Id', accessor: 'borrowerId' },
                            { header: 'loan Amount', accessor: 'loanAmount' },
                            { header: 'interest Rate', accessor: 'interestRate' },
                            { header: 'date', accessor: 'date' },
                            { header: 'dueDate', accessor: 'dueDate' },
                            { header: 'loan Status Id', accessor: 'loanStatusId' },
                        ]}
                        onCreate={() => handleCreate('loans')}
                        onEdit={(row) => handleEdit(row, 'loans')}
                        onDelete={(id) => handleDelete(id, 'loans')}
                    />
                    <TableAdmin
                        title="Payments"
                        data={dataPayment}
                        columns={[
                            { header: 'id', accessor: 'id' },
                            { header: 'description', accessor: 'description' },
                            { header: 'loan Id', accessor: 'loanId' },
                            { header: 'principal Payment', accessor: 'principalPayment' },
                            { header: 'interest Payment', accessor: 'interestPayment' },
                            { header: 'date', accessor: 'date' },
                        ]}
                        onCreate={() => handleCreate('payments')}
                        onEdit={(row) => handleEdit(row, 'payments')}
                        onDelete={(id) => handleDelete(id, 'payments')}
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
                        onCreate={() => handleCreate('borrowers')}
                        onEdit={(row) => handleEdit(row, 'borrowers')}
                        onDelete={(id) => handleDelete(id, 'borrowers')}
                    />
                    <TableAdmin
                        title="Status Borrower"
                        data={dataStatusBorrower}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Status', accessor: 'status' },
                            { header: 'Description', accessor: 'description' },
                        ]}
                        onCreate={() => handleCreate('status/borrower')}
                        onEdit={(row) => handleEdit(row, 'status/borrower')}
                        onDelete={(id) => handleDelete(id, 'status/borrower')}
                    />
                    <TableAdmin
                        title="Status Loan"
                        data={dataStatusLoan}
                        columns={[
                            { header: 'ID', accessor: 'id' },
                            { header: 'Status', accessor: 'status' },
                            { header: 'Description', accessor: 'description' },
                        ]}
                        onCreate={() => handleCreate('status/loan')}
                        onEdit={(row) => handleEdit(row, 'status/loan')}
                        onDelete={(id) => handleDelete(id, 'status/loan')}
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
                fields={fieldsByType[createType] || []}
                title={`Crear nuevo ${createType}`}
                onSave={async (newData) => {
                    try {
                        const response = await fetch(`http://localhost:5000/api/${createType}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newData),
                        });

                        if (!response.ok) throw new Error('Error al crear');
                        console.log("Creación exitosa");
                    } catch (error) {
                        console.error("Error al crear:", error);
                    }
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
