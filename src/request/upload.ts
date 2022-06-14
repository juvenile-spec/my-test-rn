import {request, Result} from './index';

export interface Params {
  voucher: string;
  formData: any;
}

export type ResultData = {
  hash: string;
  key: string;
};

export interface ResData {
  (data: Params): Promise<Result<ResultData>>;
}
export const setUpload: ResData = ({voucher, formData}) => {
  return request({
    method: 'post',
    url: '/upload',
    headers: {voucher, 'Content-Type': 'multipart/form-data'},
    data: formData,
  });
};
