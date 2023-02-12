type ResponseOptiopns = {
  pick?: string[];
  omit?: string[];
};

const prepareResponse = (data: object, options?: ResponseOptiopns) => {
  if (!options) {
    return data;
  }

  const {pick, omit} = options;

  if (pick)
    return pick.filter(key => key in data).map(key => ({
      // @ts-ignore
      [key]: data[key],
    }));

  if (omit)
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => !omit.includes(key))
    );

  return data;
}

export const response = <T extends object>(data: T, options?: ResponseOptiopns) => ({
  data: prepareResponse(data, options),
});

export const responseWithMeta = <T extends object, K extends object>(data: T, meta?: K, options?: ResponseOptiopns) => ({
  data: prepareResponse(data, options),
  meta,
});
