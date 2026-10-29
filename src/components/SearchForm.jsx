export default function SearchForm({ value, onChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label htmlFor="query">Search for a show</label>
      <input id="query" type="text" value={value} onChange={(e) => onChange(e.target.value)}/>
      <button type="submit">Search</button>
    </form>
  );
}
