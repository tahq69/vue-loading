export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function progress(total: number, completed: number) {
  const left = total === 0 ? 0 : 100 / (total * 2)
  const right = left === 0 ? 0 : (100 - left) * completed / total

  return left + right
}

export function log(type: "log" | "debug" | "warn" | "error", ...args) {
  if (window && (window as any).__cripVerbose) {
    console[type].apply(console, ["[crip-vue-loading]", ...args])
  }
}
