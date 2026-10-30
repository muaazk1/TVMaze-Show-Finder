/* 
  Name: Mu'aaz Khan
  Date: 10.29.2026
  CSC 372-01

  This is the Attribution.jsx page for assignment 5. It is responsible for rendering the attribution information.
*/

/**
 * Renders the attribution information for the data source and license.
 * @returns {JSX.Element} - The rendered Attribution component.
 */
export default function Attribution() {
  return (
    <footer className="site-footer">
      Data provided by <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">TVmaze.com</a>{" "}
      under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA</a>.
    </footer>
  );
}
