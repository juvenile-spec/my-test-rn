import React, {useEffect, useState} from 'react';
import {storage} from '../storage';

const useStorageLoad = (key: string) => {
  const [val, setVal] = useState<any>();
  useEffect(() => {
    (async () => {
      setVal(await storage.load(key));
    })();
  }, [key]);
  return val;
};
export default useStorageLoad;
