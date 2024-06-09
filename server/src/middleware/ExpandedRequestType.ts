import { Request } from 'express';

// export interface ExpandedRequest extends Request {
//   [key: string]: any;
// }

export type ExpandedRequest = Request & Record<string, any>;
