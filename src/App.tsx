import React, { useState } from "react";

import styles from "./app.module.css";

import { debouncedSearch } from "./services/search.service";
import NavbarComponent from "./components/navbar/Navbar.component";
import SearchIcon from "./icons/Search.icon";
import ArticleCardComponent from "./components/article-card/ArticleCard.component";
import { articles } from "./repository/articles";

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

        <div className={styles.container}>
          <div className={styles.articles}>
            {articles &&
              articles.length > 0 &&
              articles.map((article, index) => {
                return (
                  <ArticleCardComponent
                    key={index}
                    image={article.image}
                    title={article.title}
                    shortText={article.shortText}
                  />
                );
              })}
          </div>

          <div className={styles.recent__searches}>
            <h2>Recent Searches</h2>

            <ul className={styles.list}>
              <li onClick={() => setQuery("One")} tabIndex={0} role="button">
                One
              </li>
              <li onClick={() => setQuery("Two Search")} tabIndex={0} role="button">
                Two Search
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
