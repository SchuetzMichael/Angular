import {Item} from './item';
import {Status} from './status';
import {User} from './user';

export class Order {
  constructor(public id: number,
              public items: Item[],
              public user_id: number,
              public date: Date,
              public price_brutto: number,
              public price_netto: number,
              public status: Status[],
              public user: User[] ){
  }
}
