import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { pipeline } from 'stream';

const pump = util.promisify(pipeline);

@Injectable()
export class StorageService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: any): Promise<string> {
    const filename = `${Date.now()}-${file.filename}`;
    const destinationPath = path.join(this.uploadDir, filename);
    await pump(file.file, fs.createWriteStream(destinationPath));
    return `/uploads/${filename}`;
  }
}
