import { NextApiRequest } from 'next';
import { File } from 'multer';

export interface NextApiRequestWithFile extends NextApiRequest {
  file: File;
}
