import _ from 'lodash';

export const createList = (n, factory) =>
  _.fill(Array(n), null).map((_n, i) => factory(i));

export const sum = (...args) => args.reduce((s, x) => s + x, 0);
