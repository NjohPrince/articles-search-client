import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "./article.module.css";

type ArticleCardProps = {
  image: string;
  title: string;
  shortText: string;
  hightlightTitle: (title: string) => string;
  loading?: boolean
};

const ArticleCardComponent: React.FC<ArticleCardProps> = ({
  image,
  title,
  shortText,
  hightlightTitle,
  loading
}) => {
  return (
    <article
      tabIndex={0}
      role="link"
      className={`${styles.article} ${loading ? styles.loading : ""}`}
    >
      <div className={styles.image}>
        {!loading ? (
          <LazyLoadImage
            effect="blur"
            width="100%"
            height="100%"
            src={image}
            alt={title}
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.content}>
        {!loading ? (
          <h3 dangerouslySetInnerHTML={{ __html: hightlightTitle(title) }}></h3>
        ) : (
          <div className={styles.h3}></div>
        )}
        {!loading ? <p>{shortText}</p> : <p className={styles.p}></p>}
      </div>
    </article>
  );
};

export default ArticleCardComponent;
