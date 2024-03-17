import { useContext } from "react";
import "./Newsline.css"
import { NewslineType } from "../service";
import NewslineContext from "../../contexts/NewsLineContext";

const Newsline = () => {

  const newsline = useContext(NewslineContext) as NewslineType;

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