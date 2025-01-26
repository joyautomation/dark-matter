/**
 * Flattens an object into an array of objects, adding an 'id' property to each.
 *
 * @template T - The type of the values in the input object.
 * @param {Object.<string, T>} obj - The input object to flatten.
 * @returns {Array.<{id: string} & T>} An array of objects, each containing an 'id' property and the properties of the original object's value.
 *
 * @example
 * const input = { foo: { bar: 1 }, baz: { qux: 2 } };
 * const result = flatten(input);
 * // Result: [{ id: 'foo', bar: 1 }, { id: 'baz', qux: 2 }]
 */
export const flatten = <T>(obj: Record<string, T>) => {
  return Object.entries(obj).map(([key, value]) => ({
    ...value,
    id: key,
    name: key,
  }));
};

/**
 * Converts an array of objects back into an object, using each item's 'id' or 'name' as the key.
 * If an item has both 'id' and 'name', 'id' takes precedence.
 * Items without either 'id' or 'name' are skipped.
 *
 * @template T - Type of objects in the array, must potentially have 'id' and/or 'name' properties
 * @param {T[] | null | undefined} arr - Array of objects to convert, or null/undefined
 * @returns {{ [key: string]: T }} Object with keys from items' id/name properties and values from the items themselves
 *
 * @example
 * // Using id
 * unflatten([{ id: 'foo', value: 1 }, { id: 'bar', value: 2 }])
 * // => { foo: { id: 'foo', value: 1 }, bar: { id: 'bar', value: 2 } }
 *
 * @example
 * // Falling back to name
 * unflatten([{ name: 'foo', value: 1 }])
 * // => { foo: { name: 'foo', value: 1 } }
 *
 * @example
 * // Handling null/undefined
 * unflatten(null) // => {}
 * unflatten(undefined) // => {}
 */
export const unflatten = <
  T extends { id?: string | null; name?: string | null }
>(
  arr?: T[] | null
): { [key: string]: T } => {
  if (!arr) {
    return {};
  }
  return arr.reduce((acc, item) => {
    const id = item.id ?? item.name;
    if (id) {
      acc[id] = item;
    }
    return acc;
  }, {} as { [key: string]: T });
};
