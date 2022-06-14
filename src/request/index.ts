import axios from 'axios';
import {toast} from '../utils';

const url = 'http://139.198.117.53:3080';

interface Option {
  method: 'post' | 'get';
  url: string;
  headers?: any;
  data?: any;
  baseURL?: string;
}
export interface Result<T = any> {
  code: string | number;
  msg: string;
  data?: T;
}

export const request = (option: Option): Promise<Result> => {
  return new Promise((resolve, reject) => {
    let params: Option = {
      baseURL: url,
      ...option,
    };
    option.method === 'post' ? (params.data = option.data) : '';
    axios(params)
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        toast('哎呀，出问题了，哈哈。');
        reject(err);
      });
  });
};
