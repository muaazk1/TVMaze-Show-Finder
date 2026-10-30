/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the SearchForm.jsx page for assignment 5. It is responsible for rendering the search form.
*/

/**
 * Renders a search form for searching TV shows.
 * @param {Object} props - The component props. 
 * @param {string} props.value - The current value of the search input.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {function} props.onSubmit - The function to call when the form is submitted.
 * @returns {JSX.Element} - The rendered SearchForm component.
 */
export default function SearchForm({ value, onChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label htmlFor="query">Search for a show</label>
      <input id="query" type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
      <button type="submit">Search</button>
    </form>
  );
}
