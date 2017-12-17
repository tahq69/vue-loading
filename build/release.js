let spawn = require("child_process").spawn
let version = require("./../package.json").version

let parts = version.split(".")
let last = parts.splice(-1, 1)[0]
version = parts.join(".") + "." + (parseInt(last || 0) + 1)

console.log(`Build of v${version} started.`)

let ls = spawn("cmd.exe", ["/c", `release.bat ${version}`])

ls.stdout.on("data", data => {
  console.log(data.toString())
})

ls.on("exit", code => {
  console.log(`process exited with code ${code}`)
})
