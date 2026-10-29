import ShowCard from "./ShowCard.jsx";

export default function ShowList({ shows, status, error }) {
  if (status === "loading") return <p className="message">Loading shows…</p>;
  if (status === "invalid") return <p className="message">Enter a show title or keyword to search.</p>;
  if (status === "error") return <p className="message error">Something went wrong: {error}</p>;
  if (shows.length === 0) return <p className="message">No shows matched that search. Try a different title or keyword.</p>;
  return (
    <ul className="show-list">
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </ul>
  );
}
