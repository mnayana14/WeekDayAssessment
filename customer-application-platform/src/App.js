import React, { useEffect,useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { InfiniteScrollPage } from "./components/InfiniteScrollPage";
import {
  setCandidateInfo,
  updateJdList,
} from "./application-redux/src/actions/jdListActions";

function App() {
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 10,
        offset: offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      try {
        const response = await fetch(
          "https://api.weekday.technology/adhoc/getSampleJdJSON",
          requestOptions
        );
        const data = await response.json();
        console.log('jdListtt',data?.jdList)
        dispatch(setCandidateInfo(data));
        dispatch(updateJdList(data?.jdList));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [offset]);


  const candidateInfo = useSelector((state) => state?.candidateInfo);
  const jdList = useSelector((state) => state?.candidateInfo?.jdList);
  return (
    <div className="App">
      <header className="App-header">
        {/* Render InfiniteScrollPage only when candidateInfo is not null */}
        {candidateInfo !== null && (
          <InfiniteScrollPage
            candidateInfo={candidateInfo?.candidateInfo}
            jdList={jdList}
            offset={offset}
            setOffset={setOffset}
          />
        )}
      </header>
    </div>
  );
}

export default App;
