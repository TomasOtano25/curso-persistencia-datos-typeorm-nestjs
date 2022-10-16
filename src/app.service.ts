import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientPg: Client,
  ) {}

  getHello(): string {
    console.log(this.configService.apiKey);
    console.log(this.configService.database.name);
    return 'Hello World!';
  }

  // client.connect();
  // client.query('SELECT * FROM tasks', (err, res) => {
  //   if (err) console.log(err);
  //   console.log(res.rows);
  // });

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
