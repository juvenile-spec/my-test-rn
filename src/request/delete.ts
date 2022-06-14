import {request, Result} from './index';

export interface Params {
  voucher: string;
  deleteId: {uuid: string};
}

export type ResultData = {};

export interface ResData {
  (data: Params): Promise<Result<ResultData>>;
}
export const setDelete: ResData = ({voucher, deleteId}) => {
  return request({
    method: 'post',
    url: '/delete',
    headers: {voucher},
    data: deleteId,
  });
};
