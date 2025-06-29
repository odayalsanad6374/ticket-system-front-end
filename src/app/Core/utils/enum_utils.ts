export function enumToOptions(enumObj: any): { label: string, value: number }[] {
  return Object.keys(enumObj)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      label: key,
      value: enumObj[key as keyof typeof enumObj]
    }));
}