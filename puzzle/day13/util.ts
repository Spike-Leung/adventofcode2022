import { getInputInterator } from "@/utils.ts"

export const pairs = []

function parseLineToArray(line: string) {
    const stack = []

    for (let i = 0; i < line.length; i++) {
        const s = line[i]
        if (s === '[') {
            stack.push([])
        } else if (s === ',') {
            continue
        } else if (s === ']') {
            if (stack.length > 1) {
                const arr = stack.pop()
                stack[stack.length - 1].push(arr)
            }
        } else {
            let num = ''
            while (!Number.isNaN(+line[i])) {
                num += line[i]
                i++
            }
            stack[stack.length - 1].push(+num)
            i--
        }
    }


    return stack.pop()
}

export function compare(a, b) {
    if (typeof a === "number" && typeof b === "number") {
        if (a < b) {
            return true
        } else if (a === b) {
            return 'continue'
        } else {
            return false
        }
    } else if (typeof a === "number" && typeof b === "object") {
        return compare([a], b, true)
    } else if (typeof a === "object" && typeof b === "number") {
        return compare(a, [b], true)
    } else if (typeof a === "object" && typeof b === "object") {
        let res = 'continue'

        for (let i = 0; i < a.length && res === 'continue'; i++) {
            if (b[i] === undefined) {
                res = false
                break;
            }
            res = compare(a[i], b[i])
        }

        if (res === 'continue' && a.length < b.length) {
            res = true
        }

        return res
    }
}

for await (let line of await getInputInterator(import.meta)) {
    if (line) {
        pairs.push(parseLineToArray(line))
    }
}
