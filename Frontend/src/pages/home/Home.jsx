import './Home.css';
import Nav from '../../components/nav/nav';
import TableView from '../../components/tableView/table';
import { useFetchApiLoan } from '../../hooks/useFetchApiLoan';

export default function Home() {
  const { data: dataActiveLoans } = useFetchApiLoan('api/stats/active-loans');
  const { data: dataSumLoansClient } = useFetchApiLoan('api/stats/loan-summary-by-client');
  const { data: dataLoanNearDue } = useFetchApiLoan('api/stats/loans-near-due');

  return (
    <div className="home-container">
      <Nav />

      <TableView
        title="Active Loans"
        data={dataActiveLoans}
        columns={
          [
            { header: 'Name', accessor: 'fullName' },
            { header: 'Id Loan', accessor: 'id' },
            { header: 'Description', accessor: 'description' },
            { header: 'Loan Amount', accessor: 'loanAmount' },
            { header: 'Pending Amount', accessor: 'pendingAmount' },
            { header: 'Interest Rate', accessor: 'interestRate' },
            { header: 'Date', accessor: 'date' },
            { header: 'DueDate', accessor: 'dueDate' },
          ]
        }
      />
      <TableView
        title="Amount Loaned - Client"
        data={dataSumLoansClient}
        columns={
          [
            { header: 'Name', accessor: 'fullName' },
            { header: 'Total Loaned', accessor: 'total_loaned' }
          ]
        }
      />
      <TableView
        title="Loans Near Due"
        data={dataLoanNearDue}
        columns={
          [
            { header: 'Name', accessor: 'fullName' },
            { header: 'Description', accessor: 'description' },
            { header: 'Loan Amount', accessor: 'loanAmount' },
            { header: 'Pending Amount', accessor: 'pendingAmount' },
            { header: 'DueDate', accessor: 'dueDate' },
          ]
        }
      />
    </div>
  );
}
