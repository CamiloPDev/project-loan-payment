import { useFetchApiLoan } from './hooks/useFetchApiLoan';
import './App.css'

function App() {
  const {data} = useFetchApiLoan('api/borrowers');


  return (
    <>
      <h1>Consume Api</h1>
      <div className='card'>
        <ul>
          {data ? (
            data.map((borrower) => (
              <li key={borrower.id}>
                {borrower.firstName} {borrower.lastName}
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    </>
  )
}

export default App
