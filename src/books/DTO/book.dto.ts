export class BookDto {
    id: number;
    authorId: number;
    editorId: number;
    editionDate: Date;
    name: string;
    resume: string;
    coverLink: string;
    state: string;
    borrowedBy: number;
  }