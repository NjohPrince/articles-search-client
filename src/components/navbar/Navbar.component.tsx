import React from "react";

import styles from "./navbar.module.css";

const NavbarComponent = () => {
  return (
    <header>
      <nav role="navigation" className={styles.navbar} aria-label="main">
        <div className={styles.logo}>
          <h2>
            Latest <span>Articles</span>
          </h2>
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
