import React from 'react'

import Cell from '../Cell/Cell'
import './Board.css'
import { calculateWinner } from '../functions/calculateWinner'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

const Board = (props) => {

    const user = useSelector((state) => state.user)

    const [row, setRow] = useState(30)
    const [column, setColumn] = useState(30)
    // const [player, setPlayer] = useState('X')
    const [player, setPlayer] = useState(() => ({ name: user.user1, icon: 'X' }))
    const [winner, setWinner] = useState()

    const position = useSelector((state) => state.position)

    useEffect(() => {
        const result = calculateWinner(row, column, position.X, position.O)

        if (!result) {
            return
        } else {
            if (result === 'X') {
                setWinner(user.user1)
            } else {
                setWinner(user.user2)
            }
        }
        // console.log(position.X)
        // console.log(position.O)
    }, [position.X, position.O])

    return (
        <div className='board'>
            {winner &&
                <b>
                    {winner} win!! Congratulation
                </b>
            }
            {
                Array(row).fill().map((item, y) =>
                    <div key={y} className='row' >
                        {Array(column).fill().map((item, x) =>
                            <Cell
                                key={x}
                                // value={xy.value}
                                index={{ x, y }}
                                player={player}
                                setPlayer={setPlayer}
                                row={row}
                                setRow={setRow}
                                column={column}
                                setColumn={setColumn}
                                winner={winner}
                            />
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default Board