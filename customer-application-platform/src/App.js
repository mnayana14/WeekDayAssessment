import React, { useEffect, useState } from 'react';
import './App.css';
import InfiniteScrollPage from './InfiniteScrollPage';

function App() {

  const [candidateInfo, setCandidateInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        "limit": 10,
        "offset": 0
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
      };

      try {
        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
        const data = await response.json();
        console.log("Total Count:", data.totalCount); // Log the total count of jobs
        console.log("Jobs List:", data.jobs); // Log the list of jobs
        setCandidateInfo(data?.jdList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log('candidateInfo', candidateInfo);

  return (
    <div className="App">
      <header className="App-header">
        {/* Render InfiniteScrollPage only when candidateInfo is not null */}
        {candidateInfo !== null && <InfiniteScrollPage candidateInfo={candidateInfo} />}
      </header>
    </div>
  );
}

export default App;