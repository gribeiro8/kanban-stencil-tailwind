export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}


export  function verifyObject(object) {
  return Object.keys(object).length !== 0;
}
