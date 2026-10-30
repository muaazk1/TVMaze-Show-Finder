/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the ShowCard.jsx page for assignment 5. It is responsible for rendering a single TV show card.
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CastList from "./CastList.jsx";
import { fetchJson, castUrl, stripHtml, truncate, formatDate, formatDateTime, formatGenres, formatRating } from "../utils.js";

/**
 * Renders a single TV show card with its details and main cast.
 * It fetches the cast information from the TVmaze API and displays it.
 * @param {Object} props - The component props.
 * @param {Object} props.show - The show object containing its details.
 * @returns {JSX.Element} - The rendered ShowCard component.
 */
export default function ShowCard({ show }) {
  const [cast, setCast] = useState([]);
  const [castStatus, setCastStatus] = useState("loading");
  const [castError, setCastError] = useState("");

  useEffect(() => {
    setCastStatus("loading");
    fetchJson(castUrl(show.id))
      .then((data) => {
        setCast(data);
        setCastStatus("success");
      })
      .catch((err) => {
        setCastError(err.message);
        setCastStatus("error");
      });
  }, [show.id]);

  return (
    <li className="card">
      {show.image?.medium ? (
        <img src={show.image.medium} alt={`Poster for ${show.name}`}/>
      ) : (
        <div className="no-poster">Poster not available</div>
      )}
      <h2><Link to={`/shows/${show.id}`}>{show.name}</Link></h2>
      <p>{truncate(stripHtml(show.summary), 220)}</p>
      <dl>
        <dt>Premiered</dt><dd>{formatDate(show.premiered)}</dd>
        <dt>Last updated</dt><dd>{formatDateTime(show.updated)}</dd>
        <dt>Genres</dt><dd>{formatGenres(show.genres)}</dd>
        <dt>Rating</dt><dd>{formatRating(show.rating)}</dd>
      </dl>
      <h3>Main cast</h3>
      <CastList cast={cast} status={castStatus} error={castError} limit={5} />
      <a href={show.url} target="_blank" rel="noreferrer">View on TVmaze</a>
    </li>
  );
}
