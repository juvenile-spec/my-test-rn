import {observable} from 'mobx';

export const isSign = observable({
  isPass: 0,
  setIsPass: function (val: number) {
    this.isPass = val;
  },
});

export const isOpen = observable({
  isOpen: false,
  setIsOpen: function (val: boolean) {
    this.isOpen = val;
  },
});

export const isVisible = observable({
  isVisible: false,
  setIsVisible: function (val: boolean) {
    this.isVisible = val;
  },
});
