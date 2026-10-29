export default function ResultsSummary({ count, term, status }) {
  if (status !== "success") return null;
  return (
    <p className="summary" aria-live="polite">
      {count} {count === 1 ? "result" : "results"} for “{term}”
    </p>
  );
}
