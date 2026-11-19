# TVMaze Show Finder

This project is a React app using Vite that searches the TVMaze API for TV shows. It displays up to 10 results as cards with a poster, summary, and main cast. You can click on a show to open a detail page with more information and a longer cast list. The data used in this site is provided by [TVmaze.com](https://www.tvmaze.com/) under [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).

## How to Run

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   
   ```
3. Open the local URL printed in the terminal.

## React Concepts

| # | Concept | Where it appears |
|---|---------|------------------|
| 1 | Components and props | App.jsx, SearchForm.jsx, ResultsSummary.jsx, ShowList.jsx, ShowCard.jsx, CastList.jsx, ShowDetail.jsx, Attribution.jsx (one component per file, and data is passed down as props) |
| 2 | Lists and keys | ShowList.jsx uses shows.map with key={show.id}, CastList.jsx uses cast.map with a key built from person and character IDs |
| 3 | Conditional rendering | ShowList.jsx (loading, error, empty search, no results, results), CastList.jsx (loading, error, empty, list), ShowDetail.jsx (loading, error, success) |
| 4 | Controlled form | SearchForm.jsx (value, onChange, onSubmit), App.jsx (handleSubmit calls e.preventDefault()) |
| 5 | State (useState) | App.jsx (input, term, shows, status, error), ShowCard.jsx (cast, castStatus, castError), ShowDetail.jsx (show, status, error, cast, castStatus, castError) |
| 6 | Effects and fetch | App.jsx (useEffect for the default and submitted search), ShowCard.jsx (useEffect for each card's cast), ShowDetail.jsx (show and cast requests), utils.js (fetchJson checks res.ok before res.json() and handles 429) |
| 7 | Lifted state | App.jsx owns the state shared by SearchForm, ResultsSummary, and ShowList; ResultsSummary.jsx shows the result count and current search term without owning the input |
| 8 | Routing | main.jsx (BrowserRouter), App.jsx (Routes, Route, Link), ShowCard.jsx and ShowDetail.jsx (Link), ShowDetail.jsx (useParams) |