import React from "react";

import styles from "./article.module.css";

type ArticleCardProps = {
  image: string;
  title: string;
  shortText: string;
};

const ArticleCardComponent: React.FC<ArticleCardProps> = ({
  image,
  title,
  shortText,
}) => {
  return (
    <article tabIndex={0} role="link" className={styles.article}>
      <div className={styles.image}>
        <img src={image} alt={title} width="100%" height={"100%"} />
      </div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{shortText}</p>
      </div>
    </article>
  );
};

export default ArticleCardComponent;
