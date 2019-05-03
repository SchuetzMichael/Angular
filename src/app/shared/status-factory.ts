
import {Status} from './status';

export class StatusFactory {

  static empty(): Status {
    return new Status(0, '',  '');
  }

  static fromObject(rawStatus: any): Status {
    return new Status(
      rawStatus.order_id,
      rawStatus.status,
      rawStatus.comment
    );
  }
}
