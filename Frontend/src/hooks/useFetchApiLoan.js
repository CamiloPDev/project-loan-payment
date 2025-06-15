import { useState, useEffect } from 'react';

export function useFetchApiLoan(endpoint) {
  const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/${endpoint}`)
        .then((response) => response.json())
        .then((data) => setData(data))
    }
    , []
    );

    return {data};
}