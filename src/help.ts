export type LogType = "log" | "debug" | "warn" | "error"

let verbose = false

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

export function setVerbose() {
  verbose = true
}

export function log(type: LogType, ...args: any[]) {
  if (verbose) {
    console[type].apply(console, ["[crip-vue-loading]", ...args])
  }
}
