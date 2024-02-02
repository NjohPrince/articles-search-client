import React, { useEffect, useState } from "react";

import styles from "./app.module.css";

import { debouncedSearch, getSearches } from "./services/search.service";
import NavbarComponent from "./components/navbar/Navbar.component";
import SearchIcon from "./icons/Search.icon";
import ArticleCardComponent from "./components/article-card/ArticleCard.component";
import { articles } from "./repository/articles";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searches, setSearches] = useState<
    {
      clientIP: string;
      search: string;
    }[]
  >([]);
  const [newArticles, setNewArticles] = useState<
    {
      image: string;
      title: string;
      shortText: string;
    }[]
  >(articles);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const filteredArticles = articles.filter(
      (article) =>
        new RegExp(newQuery, "i").test(article.title) ||
        new RegExp(newQuery, "i").test(article.shortText)
    );

    const searches = await debouncedSearch(newQuery);

    setSearches(searches);
    setNewArticles(filteredArticles.length > 0 ? filteredArticles : articles);
  };

  const highlightTitle = (title: string) => {
    const regex = new RegExp(query, "gi");
    return title.replace(
      regex,
      (match) => `<span class=${styles.highlight}>${match}</span>`
    );
  };

  useEffect(() => {
    (async () => {
      const searches = await getSearches();
      setSearches(searches);
    })();
  }, []);

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
            {newArticles &&
              newArticles.length > 0 &&
              newArticles.map((article, index) => {
                return (
                  <ArticleCardComponent
                    hightlightTitle={highlightTitle}
                    key={index}
                    image={article.image}
                    title={article.title}
                    shortText={article.shortText}
                    loading={false}
                  />
                );
              })}
          </div>

          <div className={styles.recent__searches}>
            <h2>Recent Searches</h2>

            <ul className={styles.list}>
              {searches &&
                searches.length > 0 &&
                searches.map((search, index) => {
                  return (
                    <li
                      onClick={() => setQuery(search.search)}
                      tabIndex={0}
                      role="button"
                      key={index}
                    >
                      {search.search}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
