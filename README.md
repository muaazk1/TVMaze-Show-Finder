# Assignment-5, TVMaze Show Finder

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

## Required React Concepts

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

## Reflection

Compared with my vanilla JavaScript version, the easiest part of React was having to not manipulate the DOM directly. I saved a lot of time and effort by not having to create elements by hand or having to clear the gallery before every search. React makes this application much simpler by essentially making it component based, allowing me to simply describe the UI for each status and React updates it when state changes. Components were useful as they allowed me to reuse certain things, like the cast list on both the gallery cards and the detail page.

For me, the more challenging part was thinking in terms of state and effects instead of step-by-step DOM changes and figuring how all the components interlink with each other. I had to keep the typed text and the submitted search term as separate states so the app only searched when the form was submitted, and I had to figure out how the components pass data to each other through props.

State lives in App because the search form, results summary, and show list all need the same data, and a parent can share data with its children through props. App stores the typed text, the submitted search term, the results, and the request status.