import { NA } from "../utils.js";

export default function CastList({ cast, status, error, limit, showCharacters }) {
  if (status === "loading") return <p className="subtle">Loading cast…</p>;
  if (status === "error") return <p className="subtle">Cast unavailable ({error})</p>;
  if (cast.length === 0) return <p className="subtle">{NA}</p>;
  return (
    <ul className="cast">
      {cast.slice(0, limit).map(({ person, character }) => (
        <li key={`${person.id}-${character?.id}`}>
          {person.name}
          {showCharacters && <span className="subtle"> as {character?.name || NA}</span>}
        </li>
      ))}
    </ul>
  );
}
