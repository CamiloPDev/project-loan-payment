import Nav from '../../components/nav/nav';
import TableView from '../../components/tableView/table';
import InfoCard from '../../components/BasicDatum/card';
import { useFetchApiLoan } from '../../hooks/useFetchApiLoan';

export default function Home() {
  const { data: dataActiveLoans } = useFetchApiLoan('api/stats/active-loans');
  const { data: dataSumLoansClient } = useFetchApiLoan('api/stats/loan-summary-by-client');
  const { data: dataLoanNearDue } = useFetchApiLoan('api/stats/loans-near-due');
  const { data: dataHistoryLoans } = useFetchApiLoan('api/stats/total-loans');
  const { data: dataMoneyLoaned } = useFetchApiLoan('api/stats/total-money-loaned');
  const { data: dataPendingCapital } = useFetchApiLoan('api/stats/pending-capital');
  const { data: dataMoneyRecovered } = useFetchApiLoan('api/stats/total-money-recovered');
  const { data: dataInteresEarned } = useFetchApiLoan('api/stats/total-interest-earned');

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Nav />

      <div className="flex flex-row">
        <div className="flex-1 p-6 space-y-1">
          <TableView
            title="Active Loans"
            data={dataActiveLoans}
            columns={[
              { header: 'Name', accessor: 'fullName' },
              { header: 'Id Loan', accessor: 'id' },
              { header: 'Description', accessor: 'description' },
              { header: 'Loan Amount', accessor: 'loanAmount' },
              { header: 'Pending Amount', accessor: 'pendingAmount' },
              { header: 'Interest Rate', accessor: 'interestRate' },
              { header: 'Date', accessor: 'date' },
              { header: 'DueDate', accessor: 'dueDate' },
            ]}
          />

          <TableView
            title="Amount Loaned - Client"
            data={dataSumLoansClient}
            columns={[
              { header: 'Name', accessor: 'fullName' },
              { header: 'Total Loaned', accessor: 'total_loaned' }
            ]}
          />

          <TableView
            title="Loans Near Due"
            data={dataLoanNearDue}
            columns={[
              { header: 'Name', accessor: 'fullName' },
              { header: 'Description', accessor: 'description' },
              { header: 'Loan Amount', accessor: 'loanAmount' },
              { header: 'Pending Amount', accessor: 'pendingAmount' },
              { header: 'DueDate', accessor: 'dueDate' },
            ]}
          />
        </div>
        <aside className="w-full max-w-xs p-6 border-l border-[#30363d] bg-[#161b22]">
          <div className="flex flex-col items-center space-y-4 w-full">
            <InfoCard
              title="Total History Loans"
              value={dataHistoryLoans?.[0]?.total_loans ?? '...'}
            />
            <InfoCard
              title="Total Money Loaned"
              value={dataMoneyLoaned?.[0]?.total_money_loaned ?? '...'}
            />
            <InfoCard
              title="Total Pending Capital"
              value={dataPendingCapital?.[0]?.totalPendingAmount ?? '...'}
            />
            <InfoCard
              title="Total Money Recovered"
              value={dataMoneyRecovered?.[0]?.total_money_recovered ?? '...'}
            />
            <InfoCard
              title="Total Interest Earned"
              value={dataInteresEarned?.[0]?.total_interest_earned ?? '...'}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
