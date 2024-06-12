import { Request } from 'express';

export type ExpandedRequest = Request & Record<string, any>;
