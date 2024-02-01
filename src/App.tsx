import React, { useState } from "react";

import styles from "./app.module.css";

import { debouncedSearch } from "./services/search.service";
import NavbarComponent from "./components/navbar/Navbar.component";
import SearchIcon from "./icons/Search.icon";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    debouncedSearch(newQuery);
  };

  return (
    <div className="App">
      <NavbarComponent />
      <main className={styles.main}>
        <div className={styles.search}>
          <span className={styles.icon}>
            <SearchIcon size={22} color="#676767" />
          </span>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Type your search"
          />
        </div>
      </main>
    </div>
  );
};

export default App;
