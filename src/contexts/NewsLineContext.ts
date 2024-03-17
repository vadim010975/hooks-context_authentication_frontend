import { createContext } from "react";
import { NewslineType } from "../components/service";

const NewslineContext = createContext<NewslineType | undefined>(undefined);

export default NewslineContext;