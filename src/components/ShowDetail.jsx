/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the ShowDetail.jsx page for assignment 5. It is responsible for rendering the details of a single TV show.
*/

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CastList from "./CastList.jsx";
import { fetchJson, showUrl, castUrl, stripHtml, formatDate, formatDateTime, formatGenres, formatRating, getNetwork, NA } from "../utils.js";

/**
 * Renders the details of a single TV show based on the provided ID from the URL parameters.
 * It fetches the show details and cast information from the TVmaze API and displays them.
 * @returns {JSX.Element} - The rendered ShowDetail component.
 */
export default function ShowDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [cast, setCast] = useState([]);
  const [castStatus, setCastStatus] = useState("loading");
  const [castError, setCastError] = useState("");

  useEffect(() => {
    setStatus("loading");
    fetchJson(showUrl(id))
      .then((data) => { setShow(data); setStatus("success"); })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [id]);

  useEffect(() => {
    setCastStatus("loading");
    fetchJson(castUrl(id))
      .then((data) => { setCast(data); setCastStatus("success"); })
      .catch((err) => {
        setCastError(err.message);
        setCastStatus("error");
      });
  }, [id]);

  const back = <Link to="/">Back to the gallery</Link>;

  if (status === "loading") return <p className="message">Loading show…</p>;
  if (status === "error") {
    return (
      <div className="error message">
        <p>{error === "Not found." ? "We couldn't find a show with that ID." : `Couldn't load this show: ${error}`}</p>
        {back}
      </div>
    );
  }

  return (
    <article>
      {back}
      <h1>{show.name}</h1>
      <div className="detail-body">
        {show.image?.original ? (
          <img src={show.image.original} alt={`Poster for ${show.name}`} />
        ) : (
          <div className="no-poster">Poster not available</div>
        )}
        <div>
          <p>{stripHtml(show.summary)}</p>
          <dl>
            <dt>Premiered</dt><dd>{formatDate(show.premiered)}</dd>
            <dt>Last updated</dt><dd>{formatDateTime(show.updated)}</dd>
            <dt>Genres</dt><dd>{formatGenres(show.genres)}</dd>
            <dt>Rating</dt><dd>{formatRating(show.rating)}</dd>
            <dt>Status</dt><dd>{show.status || NA}</dd>
            <dt>Network / channel</dt><dd>{getNetwork(show)}</dd>
          </dl>
          <a href={show.url} target="_blank" rel="noreferrer">View on TVmaze</a>
        </div>
      </div>
      <h2>Cast</h2>
      <CastList cast={cast} status={castStatus} error={castError} limit={15} showCharacters/>
    </article>
  );
}