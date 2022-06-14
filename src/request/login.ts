import {request, Result} from './index';

export interface Data {
  account: string;
}

export interface ResData {
  (data: Data): Promise<Result>;
}
export const setLogin: ResData = ({account}) => {
  return request({
    method: 'post',
    url: '/login',
    data: {account},
  });
};
