import { Author} from './author';

export class AuthorFactory {

  static empty(): Author {
    return new Author(null, '', '');
  }

  static fromObject(rawAuthor: any): Author {
    return new Author(
      rawAuthor.id,
      rawAuthor.firstname,
      rawAuthor.lastname,
    );
  }
}
