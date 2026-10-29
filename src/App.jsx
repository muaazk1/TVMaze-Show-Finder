import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchForm from "./components/SearchForm.jsx";
import ResultsSummary from "./components/ResultsSummary.jsx";
import ShowList from "./components/ShowList.jsx";
import ShowDetail from "./components/ShowDetail.jsx";
import Attribution from "./components/Attribution.jsx";
import { fetchJson, searchUrl } from "./utils.js";

const DEFAULT_TERM = "office";

export default function App() {
  const [input, setInput] = useState(DEFAULT_TERM);      
  const [term, setTerm] = useState(DEFAULT_TERM);      
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState("loading"); 
  const [error, setError] = useState("");

  useEffect(() => {
    setStatus("loading");
    fetchJson(searchUrl(term))
      .then((data) => {
        setShows(data.slice(0, 10).map((item) => item.show));
        setStatus("success");
      })
      .catch((err) => {
        setShows([]);
        setError(err.message);
        setStatus("error");
      });
  }, [term]);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setStatus("invalid");
      return;
    }
    if (trimmed === term && status === "success") return; 
    setTerm(trimmed);
  }

  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="logo">TVMaze Show Finder</Link>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm value={input} onChange={setInput} onSubmit={handleSubmit} />
                <ResultsSummary count={shows.length} term={term} status={status} />
                <ShowList shows={shows} status={status} error={error} />
              </>
            }
          />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </main>
      <Attribution />
    </div>
  );
}