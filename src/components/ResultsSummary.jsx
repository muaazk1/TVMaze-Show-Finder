/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the ResultsSummary.jsx page for assignment 5. It is responsible for rendering a summary of the search results.
*/

/**
 * Renders a summary of the search results, including the count of results and the search term.
 * @param {Object} props - The component props.
 * @param {number} props.count - The number of search results.
 * @param {string} props.term - The search term.
 * @param {string} props.status - The status of the search.
 * @returns {JSX.Element} - The rendered ResultsSummary component.
 */
export default function ResultsSummary({ count, term, status }) {
  if (status !== "success") return null;
  return (
    <p className="summary">
      {count} {count === 1 ? "result" : "results"} for “{term}”
    </p>
  );
}
