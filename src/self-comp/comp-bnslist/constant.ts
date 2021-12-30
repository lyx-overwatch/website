export const listData = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  }
];

export const getCurData = (list: any[], times: number) => {
  return list.map(item => {
    const { value } = item;
    return {
      value: value + times * list.length
    }
  })
}