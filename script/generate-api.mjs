import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';

generateApi({
    name: 'Api.ts',
    output: resolve(process.cwd(), './src/api'),
    input: resolve(process.cwd(), '../office-uninterruptible_power_supply/docs/swagger.json'),
    httpClientType: 'axios',
});