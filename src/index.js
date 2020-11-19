/**
 * The main script file of the application.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @version 1.0.0
 */

import './components/bart-board/'

// Adding a board with JS
const board = document.createElement('bart-board')
document.querySelector('body').appendChild(board)

// Make the bad Bart board wipeable.
document.querySelector('#badBart').addEventListener('filled', (event) => {
  event.target.clear()
})
