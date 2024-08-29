function DEVGroupKeysByValue(style) {
  // ==== DEV ONLY ====
  // Create a map to store arrays of keys for each unique value
  const valueMap = new Map()

  // Iterate through the object's entries
  for (const [key, value] of Object.entries(obj)) {
    if (!valueMap.has(value)) {
      valueMap.set(value, [])
    }
    valueMap.get(value).push(key)
  }

  // Transform the map into the desired format
  const result = {}
  for (const [value, keys] of valueMap) {
    result[value] = keys
  }

  return result
}

export { DEVGroupKeysByValue }
