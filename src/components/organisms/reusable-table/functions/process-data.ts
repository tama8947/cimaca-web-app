type ObjectWithNameKey = {
  name: string
}

const objectKeysToValue = <T>(item: T) => {
  const convertedItem: Record<string, unknown> = {};
  Object.keys(item as object).forEach((key) => {
    convertedItem[key] = typeof item[key as keyof T] === 'object'
      ? (item[key as keyof T] as unknown as ObjectWithNameKey)?.name
      : item[key as keyof T];
  });
  return convertedItem;
};

export const processData = <T>(data: T[]) => {
  return data.map((item) => objectKeysToValue(item)
  );
};
