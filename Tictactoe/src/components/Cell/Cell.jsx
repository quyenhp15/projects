import React from 'react'
import './Cell.css'
import { calculateWinner } from '../functions/calculateWinner'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addXPosition, addOPosition } from '../store/positionSlice'

const Cell = (props) => {

    const dispatch = useDispatch();
    const position = useSelector((state) => state.position)

    const user = useSelector((state) => state.user)

    const { index, player, setPlayer, row, setRow, column, setColumn, winner } = props

    const [xo, setXO] = useState('')

    const handleOnClick = () => {


        console.log('INDEX CLICKED: ', index)
        if (xo || winner) {
            return
        }
        setXO(player.icon)

        // X or O
        if (player.icon === 'X') {
            setPlayer({ name: user.user2, icon: 'O' })
            dispatch(addXPosition(index))
        } else {
            // setPlayer('X')
            setPlayer({ name: user.user1, icon: 'X' })
            dispatch(addOPosition(index))
        }

        if (index.x === column - 1) {
            setColumn(column + 10)
        }
        if (index.y === row - 1) {
            setRow(row + 10)
        }
        // console.log(column, row)
    }

    return (
        <div className='cell' onClick={() => handleOnClick()} >
            {xo === 'X' ?
                <div style={{ color: 'red' }}>X</div>
                :
                xo === 'O' ?
                    <div style={{ color: 'blue' }}>O</div>
                    :
                    ''
            }
        </div>
    )
}

export default Cell