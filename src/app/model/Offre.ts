import { Tag } from "./Tag";

export interface Offre {
  id: number;
  titre: string;
  description: string;
  createur: String;
  tags: Tag[];
  tagNames: string[]; // Include the tagNames property
}
