export type LogType = "debug" | "log" | "warn" | "error"

const levels = ["debug", "log", "warn", "error"]

let verbose = false
let level = "debug"

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

export function setVerbose(debugLevel = "debug") {
  verbose = true
  level = debugLevel
}

export function log(type: LogType, ...args: any[]) {
  if (verbose && levels.indexOf(type) >= levels.indexOf(level)) {
    console[type].apply(console, ["[crip-vue-loading]", ...args])
  }
}
