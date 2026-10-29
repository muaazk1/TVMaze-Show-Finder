import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CastList from "./CastList.jsx";
import { fetchJson, castUrl, stripHtml, truncate, formatDate, formatDateTime, formatGenres, formatRating } from "../utils.js";

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
