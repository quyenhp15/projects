export function calculateWinner(row, column, arrX, arrO) {

    // console.log('CHECK: ', row, column)
    // console.log('X: ', arrX)

    let winLines = {
        horizontal: [],
        vertical: [],
        rightDiagonal: [],
        leftDiagonal: []
    }

    //horizontal
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const a = { x: j, y: i },
                b = { x: j + 1, y: i },
                c = { x: j + 2, y: i },
                d = { x: j + 3, y: i },
                e = { x: j + 4, y: i }

            const aString = a.x + '-' + a.y
            // const stringPosition = 
            if (e.x >= column) { break }
            winLines.horizontal.push({ a, b, c, d, e })
        }
    }
    // console.log(winLines.horizontal)

    //vertical
    for (let line = 0; line < row; line++) {
        for (let cell = 0; cell < column; cell++) {

            const a = { x: cell, y: line },
                b = { x: cell, y: line + 1 },
                c = { x: cell, y: line + 2 },
                d = { x: cell, y: line + 3 },
                e = { x: cell, y: line + 4 }

            if (e[1] >= row) {
                break
            }
            winLines.vertical.push({ a, b, c, d, e })
        }
    }
    // console.log('vertical: ', winLines.vertical)

    //right diagonal
    for (let line = 0; line < row; line++) {
        for (let cell = 0; cell < column; cell++) {
            const a = { x: cell, y: line },
                b = { x: cell + 1, y: line + 1 },
                c = { x: cell + 2, y: line + 2 },
                d = { x: cell + 3, y: line + 3 },
                e = { x: cell + 4, y: line + 4 }

            if (e[0] >= column || e[1] >= row) { break }
            winLines.rightDiagonal.push({ a, b, c, d, e })
        }
    }
    // console.log(winLines.rightDiagonal)

    //left diagonal
    for (let line = 0; line < row; line++) {
        for (let cell = 0; cell < column; cell++) {
            const a = { x: cell, y: line },
                b = { x: cell - 1, y: line + 1 },
                c = { x: cell - 2, y: line + 2 },
                d = { x: cell - 3, y: line + 3 },
                e = { x: cell - 4, y: line + 4 }

            if (e[0] < 0) { continue }
            if (e[1] >= row) { break }
            winLines.leftDiagonal.push({ a, b, c, d, e })
        }
    }
    // console.log(winLines.leftDiagonal)

    for (let i = 0; i < winLines.horizontal.length; i++) {
        const { a, b, c, d, e } = winLines.horizontal[i]
        const pre = { x: a.x - 1, y: a.y }, next = { x: e.x + 1, y: e.y }

        if (isContain(arrX, a) && isContain(arrX, b) &&
            isContain(arrX, c) && isContain(arrX, d) &&
            isContain(arrX, e)
        ) {

            if (isContain(arrX, pre) || isContain(arrX, next) ||
                (isContain(arrO, pre) && isContain(arrO, next))
            ) {
                return
            }

            //WIN
            console.log('X win')
            return 'X'
        } else if (
            isContain(arrO, a) && isContain(arrO, b) &&
            isContain(arrO, c) && isContain(arrO, d) &&
            isContain(arrO, e)
        ) {
            if (isContain(arrO, pre) || isContain(arrO, next) ||
                (isContain(arrX, pre) && isContain(arrX, next))
            ) {
                return
            }

            //WIN
            console.log('O win')
            return 'O'
        }
    }

    for (let i = 0; i < winLines.vertical.length; i++) {
        // const { a, b, c, d, e } = winLines.vertical[i]
        const { a, b, c, d, e } = winLines.vertical[i]

        // console.log('winLines.vertical[i]: ', winLines.vertical[i])
        const pre = { x: a.x, y: a.y - 1 }, next = { x: e.x, y: e.y + 1 }

        // const pre = { x: a.x, y: a.y - 1 }
        // const next = { x: e.x, y: e.y + 1 }

        if (isContain(arrX, a) && isContain(arrX, b) &&
            isContain(arrX, c) && isContain(arrX, d) &&
            isContain(arrX, e)
        ) {

            if (isContain(arrX, pre) || isContain(arrX, next) ||
                (isContain(arrO, pre) && isContain(arrO, next))
            ) {
                return
            }

            //WIN
            console.log('X win')
            return 'X'
        } else if (
            isContain(arrO, a) && isContain(arrO, b) &&
            isContain(arrO, c) && isContain(arrO, d) &&
            isContain(arrO, e)
        ) {
            if (isContain(arrO, pre) || isContain(arrO, next) ||
                (isContain(arrX, pre) && isContain(arrX, next))
            ) {
                return
            }

            //WIN
            console.log('O win')
            return 'O'
        }
    }

    for (let i = 0; i < winLines.rightDiagonal.length; i++) {
        const { a, b, c, d, e } = winLines.rightDiagonal[i]
        const pre = { x: a.x - 1, y: a.y - 1 }, next = { x: e.x + 1, y: e.y + 1 }

        if (isContain(arrX, a) && isContain(arrX, b) &&
            isContain(arrX, c) && isContain(arrX, d) &&
            isContain(arrX, e)
        ) {

            if (isContain(arrX, pre) || isContain(arrX, next) ||
                (isContain(arrO, pre) && isContain(arrO, next))
            ) {
                return
            }

            //WIN
            console.log('X win')
            return 'X'
        } else if (
            isContain(arrO, a) && isContain(arrO, b) &&
            isContain(arrO, c) && isContain(arrO, d) &&
            isContain(arrO, e)
        ) {
            if (isContain(arrO, pre) || isContain(arrO, next) ||
                (isContain(arrX, pre) && isContain(arrX, next))
            ) {
                return
            }

            //WIN
            console.log('O win')
            return 'O'
        }
    }

    for (let i = 0; i < winLines.leftDiagonal.length; i++) {
        const { a, b, c, d, e } = winLines.leftDiagonal[i]
        const pre = { x: a.x + 1, y: a.y - 1 }, next = { x: e.x - 1, y: e.y + 1 }

        if (isContain(arrX, a) && isContain(arrX, b) &&
            isContain(arrX, c) && isContain(arrX, d) &&
            isContain(arrX, e)
        ) {

            if (isContain(arrX, pre) || isContain(arrX, next) ||
                (isContain(arrO, pre) && isContain(arrO, next))
            ) {
                return
            }

            //WIN
            console.log('X win')
            return 'X'
        } else if (
            isContain(arrO, a) && isContain(arrO, b) &&
            isContain(arrO, c) && isContain(arrO, d) &&
            isContain(arrO, e)
        ) {
            if (isContain(arrO, pre) || isContain(arrO, next) ||
                (isContain(arrX, pre) && isContain(arrX, next))
            ) {
                return
            }

            //WIN
            console.log('O win')
            return 'O'
        }
    }

    return
}

const isContain = (arr, element) => {
    return arr.some(arrElement => arrElement.x === element.x && arrElement.y === element.y)
}