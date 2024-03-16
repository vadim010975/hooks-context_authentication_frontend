import { FC } from "react";
import "./Newsline.css"

type NewslineType = {
  id: string,
  title: string,
  image: string,
  content: string,
}[];

type NewslineProps = {
  newsline: NewslineType,
}

const Newsline: FC<NewslineProps> = ({ newsline }) => {

  return (
    <section className="newsline">
      {newsline.map(news => (
        <article className="news" key={news.id}>
          <img src={news.image} alt="image" className="news__img" />
          <h4 className="news__title">{news.title}</h4>
          <div className="news__content">{news.content}</div>
        </article>
      ))}
    </section>
  );
}

export default Newsline;