/**
 * The bart-board web component module.
 *
 * @author Johan Leitet <johan.leitet@lnu.se>
 * @author Mats Loock <mats.loock@lnu.se>
 * @author Pauliina Raitaniemi <pr222ja@student.lnu.se>
 * @version 2.0.0
 */

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
      background:#002418;
      font-size: 1.2em;
      color:white;
      width:500px;
      height:200px;
      padding:10px;
      border:6px solid #9b3b00;
      border-bottom:12px solid #9b3b00;
      overflow:hidden;
      margin:10px;
      float:left;
      border-radius: 3px;
    }
    p {
      margin: 0;
      padding: 0;
    }
  </style>

  <p part="text"></p>
`

/**
 * Define custom element.
 */
customElements.define('bart-board',
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the p-element in which we add the text.
      this._textBoard = this.shadowRoot.querySelector('p')

      this._letters = 0
      this._text = 'I will never ever skip the line in the task queue again.'
      this._speed = 50
      this._interval = null
    }

    /**
     * Watches the attributes "text" and "speed" for changes on the element.
     *
     * @returns {string} - The observed attributes.
     */
    static get observedAttributes () {
      return ['text', 'speed']
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'text') {
        this._text = newValue
      } else if (name === 'speed') {
        this._speed = newValue
      }
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.addEventListener('mousedown', this._onWrite)
      this.addEventListener('mouseup', this.stopWriting)
      this.addEventListener('mouseout', this.stopWriting)
      console.log('Listening')
    }

    /**
     * Called after the element has been removed from the DOM.
     */
    disconnectedCallback () {
      this.removeEventListener('mousedown', this._onWrite)
      this.removeEventListener('mouseup', this.stopWriting)
      this.removeEventListener('mouseleave', this.stopWriting)
      this.stopWriting()
    }

    /**
     * Stops the writing.
     *
     * @returns {HTMLElement} - The stopped board.
     */
    stopWriting () {
      // TODO: Implement the method
      clearTimeout(this._interval)
      console.log('Clear?')

      return this
    }

    /**
     * Wipes the board clean and resets the letter counter.
     *
     * @returns {HTMLElement} - Its own emptied p element.
     */
    clear () {
      this._textBoard.textContent = ''
      this._letters = 0

      return this
    }

    /**
     * Writes out the text.
     */
    _onWrite () {
      console.log('Write!')

      this._interval = setInterval(() => {
        if (this._textBoard.offsetHeight >= this.offsetHeight) {
          // Create custom event to listen to for calling clear().
          const event = new CustomEvent('filled')
          this.dispatchEvent(event)
          // Stop writing.
          this.stopWriting()
          console.log('Stop!')
        } else {
          // Write a letter.
          this._textBoard.textContent += this._text.charAt(this._letters++)
          console.log('Writing')
          // Reset to make it possible to continue on next line of text.
          if (this._letters >= this._text.length) {
            this._textBoard.textContent += ' '
            this._letters = 0
          }
        }
      }, this._speed)
    }
  }
)
