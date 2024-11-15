import { User } from "./user";

export interface Post {
  id: string;
  title: string;
  body: string;
  user: User;
}
