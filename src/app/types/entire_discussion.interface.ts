import { Discussion } from "./discussion.interface";

export interface EntireDiscussion {
  id: number;
  title: string;
  content: Discussion[];
}