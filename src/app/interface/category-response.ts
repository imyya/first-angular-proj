import { Category } from "./category";

export interface CategoryResponse {
    categories:Category[],
    last_page:number,
}
