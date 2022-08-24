// extends the request interface to alllow adding local variables to the request
import {Request, Response} from 'express'

export interface ModRequest extends Request {
  user?: string;
  token?: string;
  userId?: number;
  role?: string;
}
