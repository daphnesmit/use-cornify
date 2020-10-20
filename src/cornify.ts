interface CornifyOptions {
  y?: number
  younicorns?: string
  addMagicalWords?: boolean
  addCupcakeButton?: boolean
}

export class Cornify {
  private options: CornifyOptions = {}
  private count: number = 0
  private magicalWords: string[] = [
    'Happy',
    'Sparkly',
    'Glittery',
    'Fun',
    'Magical',
    'Lovely',
    'Cute',
    'Charming',
    'Amazing',
    'Wonderful',
  ]
  private addKeyboardEvent: (e: KeyboardEvent) => void = (_e: KeyboardEvent) => this.add()

  constructor(options: CornifyOptions = {}) {
    this.options = options

    // Retrieve our click count from the cookie when we start up.
    this.initCounter()
  }

  public start() {
    // Bind keydown event to add unicorns
    this.bindEvents()

    // Add cupcake button if addCupcakeButton option is true
    if (this.options.addCupcakeButton) this.addCupcakeButton()

    // Add a unicorn
    this.add()
  }

  private initCounter() {
    this.count = parseInt(this.getCookie('cornify'))
    if (isNaN(this.count)) {
      this.count = 0
    }
  }

  private bindEvents() {
    window.addEventListener('keydown', this.addKeyboardEvent)
  }

  private removeEvents() {
    window.removeEventListener('keydown', this.addKeyboardEvent)
  }

  private createUnicornContainer() {
    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.className = '__cornify_unicorn'
    div.style.zIndex = '143143'
    div.style.outline = '0'
    div.onclick = () => this.add() // Click for more magic.
    return div
  }

  private showGrandUnicorn(container: HTMLDivElement) {
    container.style.top = '50%'
    container.style.left = '50%'
    container.style.zIndex = '143143143'
  }

  private randomizeUnicornPosition(container: HTMLDivElement) {
    container.style.top = `${Math.round(Math.random() * 100)}%`
    container.style.left = `${Math.round(Math.random() * 100)}%`
  }

  private createUnicornImage() {
    const img = document.createElement('img')
    img.style.opacity = '0'
    // Add a nice hover wigggle.
    img.style.transition = 'all .1s linear'
    img.alt = 'A lovely unicorn or rainbow'
    img.onload = () => {
      img.style.opacity = '1'
    }
    // img.style.transition = 'all .1s linear'
    return img
  }

  private onUnicornMouseOver(img: HTMLImageElement) {
    const size = 1 + Math.round(Math.random() * 10) / 100
    const angle = Math.round(Math.random() * 20 - 10)
    const result = `rotate(${angle}deg) scale(${size},${size})`
    img.style.transform = result
    img.style.webkitTransform = result
  }

  private onUnicornMouseOut(img: HTMLImageElement) {
    const size = 0.9 + Math.round(Math.random() * 10) / 100
    const angle = Math.round(Math.random() * 6 - 3)
    const result = `rotate(${angle}deg) scale(${size},${size})`
    img.style.transform = result
    img.style.webkitTransform = result
  }

  public add() {
    // Track how often we cornified.
    this.count += 1

    // Prepare our lovely variables.
    const cornify_url = 'https://www.cornify.com/'
    const showGrandUnicorn = this.count === 15
    let transform = 'translate(-50%, -50%)'

    // Create a container for our 'corn or 'bow.
    const container = this.createUnicornContainer()

    if (showGrandUnicorn) {
      // Clicking 15 times summons the grand unicorn - which is centered on the screen.
      this.showGrandUnicorn(container)
    } else {
      // Otherwise we randomize the position.
      this.randomizeUnicornPosition(container)
      transform += ` rotate(${Math.round(Math.random() * 10 - 5)}deg)`
    }

    // Create the image element.
    const img = this.createUnicornImage()

    // Used as a cache buster so the browser makes a new request every time instead of using the previous, cached one.
    const currentTime = new Date()
    let submitTime = currentTime.getTime()

    if (showGrandUnicorn) {
      // Caching doesn't matter for the Grand Unicorn.
      submitTime = 0
    }

    // Construct our unicorn & rainbow request.
    let url = `${cornify_url}getacorn.php?r=${submitTime}&url=${document?.location.href}`

    // Add younicorns if requested.
    if (this.options && (this.options.y || this.options.younicorns)) {
      url += `&y=${this.options.y ? this.options.y : this.options.younicorns}`

      // Flip horizontally at random.
      if (Math.random() > 0.5 && transform.length > 0) {
        transform += ' scaleX(-1)'
      }
    }

    container.style.transform = transform
    container.style.webkitTransform = transform

    img.setAttribute('src', url)

    container.onmouseover = () => this.onUnicornMouseOver(img)
    container.onmouseout = () => this.onUnicornMouseOut(img)

    // Append our container DIV to the page.
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(container)
    container.appendChild(img)

    // Hooray - now we have a sparkly unicorn (or rainbow) on the page. Another cornification well done. Congrats!

    // When clicking more than 5 times:
    // - add a custom stylesheet to make the page look awesome (when not already there)
    // - add magical word when addMagicalWords option is true
    if (this.count > 5) {
      this.addCornifyCss()
      if (this.options.addMagicalWords) this.addMagicalWords()
    }

    this.updateCount()

    // Trigger an event on the document so anyone could listen to that... for whatever reason..
    this.dispatchAddEvent()
  }

  private dispatchAddEvent() {
    const event = new Event('cornify')
    document.dispatchEvent(event)
  }

  private createCountElement(id: string) {
    const p = document.createElement('p')
    p.id = id
    p.style.position = 'fixed'
    p.style.bottom = '5px'
    p.style.left = '0px'
    p.style.right = '0px'
    p.style.zIndex = '1000000000'
    p.style.color = '#ff00ff'
    p.style.textAlign = 'center'
    p.style.fontSize = '24px'
    p.style.fontFamily = "'Comic Sans MS', 'Comic Sans', 'Marker Felt', serif" // Only the best!
    p.style.textTransform = 'uppercase'
    return p
  }

  // Tracks how often we cornified.
  private updateCount() {
    const id = '__this.count'
    let p = document.getElementById(id)

    if (p === null) {
      p = this.createCountElement(id)

      // Append element to DOM
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(p)
    }

    // Set content of counter
    if (this.count === 1) {
      p.innerHTML = 'You cornified!'
    } else {
      p.innerHTML = `You cornified ${this.count} times!`
    }

    // Stores our count in a cookie for our next session.
    this.setCookie('cornify', `${this.count}`, 1000)
  }

  private setCookie(name: string, value: string, days: number) {
    if (typeof window === 'undefined') return
    const d = new Date()
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${name}=${value}; ${expires}`
  }

  private getCookie(cname: string) {
    if (typeof window === 'undefined') return ''
    const name = `${cname}=`
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const c = cookies[i].trim()
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  // Clicking the rainbow cupcake button makes all the unicorns
  // disappear (should only be used in an emergency, since it's sad).
  public remove() {
    // Remove all Unicorns
    this.removeAllUnicorns()

    // Remove our counter.
    this.removeCounter()

    // Remove the cupcake button.
    this.removeCupcakeButton()

    // Remove the css
    this.removeCornifyCss()

    // Remove all magical words
    if (this.options.addMagicalWords) this.removeMagicalWords()

    // remove event listeners
    this.removeEvents()
  }

  private removeAllUnicorns() {
    const unicorns = Array.from(document.querySelectorAll('.__cornify_unicorn'))
    if (unicorns) {
      unicorns.forEach((unicorn) => {
        unicorn.parentNode?.removeChild(unicorn)
      })
    }
  }

  private removeCounter() {
    const counter = document.getElementById('__this.count')
    if (counter && counter.parentNode) {
      counter.parentNode.removeChild(counter)
    }
  }

  private removeCupcakeButton() {
    const cupcakeButton = document.getElementById('__cornify_cupcake_button')
    if (cupcakeButton && cupcakeButton.parentNode) {
      cupcakeButton.parentNode.removeChild(cupcakeButton)
    }
  }

  private addCornifyCss() {
    const cssExisting = document.getElementById('__cornify_css')

    if (!cssExisting) {
      const head = document.getElementsByTagName('head')[0]
      const css = document.createElement('link')
      css.id = '__cornify_css'
      css.type = 'text/css'
      css.rel = 'stylesheet'
      css.href = 'https://www.cornify.com/css/cornify.css'
      css.media = 'screen'
      head.appendChild(css)
    }
  }

  private removeCornifyCss() {
    const css = document.getElementById('__cornify_css')
    if (css && css.parentNode) {
      css.parentNode.removeChild(css)
    }
  }

  private getHeadings() {
    return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  }

  // Adds happy words at the beginning of all headers on the page.
  private addMagicalWords() {
    const headings = this.getHeadings()
    headings.forEach((heading) => {
      heading.innerHTML = `${
        this.magicalWords[Math.floor(Math.random() * this.magicalWords.length)]
      } ${heading.innerHTML}`
    })
  }

  // Removes happy words at the beginning of all headers on the page.
  private removeMagicalWords() {
    const headings = this.getHeadings()
    headings.forEach((heading) => {
      this.magicalWords.forEach((word) => {
        heading.innerHTML = heading.innerHTML.split(word).join('').trim()
      })
    })
  }

  private createCupcakeButton(id: string) {
    const button = document.createElement('div')
    button.id = id
    button.onclick = () => this.remove()
    button.style.position = 'fixed'
    button.style.top = '10px'
    button.style.right = '10px'
    button.style.zIndex = '2147483641'
    button.setAttribute('aria-label', 'Hide unicorns and rainbows')
    return button
  }

  private createCupcakeImage() {
    const image = document.createElement('img')
    image.src = 'https://www.cornify.com/assets/cornify-cupcake-button.png'
    image.alt = 'Cupcake button'
    image.width = 50
    image.height = 50
    image.style.width = '50px !important'
    image.style.height = '50px !important'
    image.style.display = 'block !important'
    image.style.cursor = 'pointer !important'
    image.style.margin = '0 !important'
    image.style.padding = '0 !important'
    return image
  }

  // Add the rainbow cupcake button to the page.
  public addCupcakeButton() {
    const id = '__cornify_cupcake_button'
    let button = document.getElementById(id)

    if (!button) {
      button = this.createCupcakeButton(id)

      const image = this.createCupcakeImage()

      button.appendChild(image)

      // Append to Dom
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(button)
    }
  }
}
