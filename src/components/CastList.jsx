/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the CastList.jsx page for assignment 5. It is responsible for rendering a list of cast members.
*/

import { NA } from "../utils.js";

/**
 * Renders a list of cast members for a TV show.
 * @param {Object} props - The component props.
 * @param {Array} props.cast - The array of cast members to display.
 * @param {string} props.status - The status of the data fetching (loading, error, or success).
 * @param {string} props.error - The error message to display if the status is "error".
 * @param {number} props.limit - The maximum number of cast members to display.
 * @param {boolean} props.showCharacters - Whether to show the character names alongside the cast members.
 * @returns {JSX.Element} - The rendered CastList component.
 */
export default function CastList({ cast, status, error, limit, showCharacters }) {
  if (status === "loading") return <p className="subtle">Loading cast…</p>;
  if (status === "error") return <p className="subtle">Cast unavailable ({error})</p>;
  if (cast.length === 0) return <p className="subtle">{NA}</p>;
  return (
    <ul className="cast">
      {cast.slice(0, limit).map(({ person, character }) => (
        <li key={`${person.id}-${character?.id}`}>
          {person.name}
          {showCharacters && <span> as {character?.name || NA}</span>}
        </li>
      ))}
    </ul>
  );
}
