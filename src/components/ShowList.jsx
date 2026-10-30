/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the ShowList.jsx page for assignment 5. It is responsible for rendering a list of TV shows.
*/

import ShowCard from "./ShowCard.jsx";

/**
 * Renders a list of TV shows based on the provided status and error.
 * @param {Object} props - The component props. 
 * @param {Array} props.shows - The array of shows to display.
 * @param {string} props.status - The status of the data fetching process (loading, invalid, error, or success).
 * @param {string} props.error - The error message to display if the status is "error".
 * @returns {JSX.Element} - The rendered ShowList component.
 */
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
