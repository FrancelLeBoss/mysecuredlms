import React from 'react'

const Rightside = ({ toggleTheme, muiTheme }) => {
    return (
        <div
            style={{ width: '18%', background: muiTheme.palette.background.sidebar, minHeight: '100vh', paddingLeft: '1rem', paddingRight: '1rem' }}
        >
            TTHIS IS A TEST FOR THE RIGHT SIDE
        </div>
    )
}

export default Rightside