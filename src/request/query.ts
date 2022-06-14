import {request, Result} from './index';

export interface Params {
  voucher: string;
}

export type ResultData = {
  id: number;
  imgUrl: string;
  pathName: string;
  urlName: string;
  userId: string;
  uuid: string;
};

export interface ResData {
  (data: Params): Promise<Result<ResultData[]>>;
}
export const getQuery: ResData = ({voucher}) => {
  return request({
    method: 'get',
    url: '/query',
    headers: {voucher},
  });
};
