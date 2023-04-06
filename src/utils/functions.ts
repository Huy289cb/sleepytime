
export const calculatedFromTimeSleep = (time: Date) => {
  const result = [...Array(4)].map((_: undefined, index: number) => {
    const i = index + 1;
    const resultDate = new Date(time);
    resultDate.setMinutes(i * 90 + 15);
    return resultDate;
  });
  return result;
};

export const calculatedFromTimeWakeup = (time: Date) => {
  const fullMinutes = 555;
  const result = [...Array(4)].map((_: undefined, index: number) => {
    const i = index + 1;
    const resultDate = new Date(time);
    resultDate.setMinutes(resultDate.getMinutes() - (fullMinutes - index * 90));
    return resultDate;
  });
  return result;
};
