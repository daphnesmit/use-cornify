let cornifyCount = 0

interface CornifyOptions {
  y?: number
  younicorns?: string
}

interface Cornify {
  addKeyboardEvent: (e: KeyboardEvent) => void
  start: () => void
  add: (options?: CornifyOptions) => void
  updateCount: () => void
  setCookie: (name: string, value: string, days: number) => void
  getCookie: (cname: string) => string
  replace: () => void
  remove: () => void
  addCupcakeButton: () => void
}

const cornify: Cornify = {
  addKeyboardEvent: (_e: KeyboardEvent) => cornify.add(),
  start() {
    // Retrieve our click count from the cookie when we start up.
    cornifyCount = parseInt(cornify.getCookie('cornify'))
    if (isNaN(cornifyCount)) {
      cornifyCount = 0
    }
    window.addEventListener('keydown', cornify.addKeyboardEvent)
  },

  add(options?: CornifyOptions) {
    // Track how often we cornified.
    cornifyCount += 1

    // Prepare our lovely variables.
    const cornify_url = 'https://www.cornify.com/'
    const de = document.documentElement
    let transform = 'translate(-50%, -50%)'
    const showGrandUnicorn = cornifyCount == 15

    // Create a container for our 'corn or 'bow.
    const div = document.createElement('div')
    div.style.position = 'fixed'
    div.className = '__cornify_unicorn'
    div.style.zIndex = '143143'
    div.style.outline = '0'
    div.onclick = cornify.add // Click for more magic.

    // Get the window width and height - requires some cross browser checking.
    if (typeof window.innerHeight == 'number') {
      // windowHeight = window.innerHeight;
      // windowWidth = window.innerWidth;
    } else if (de && de.clientHeight) {
      // windowHeight = de.clientHeight;
      // windowWidth = de.clientWidth;
    } else {
      // numType = '%';
      // height = `${Math.round(height * 100)}%`;
    }

    if (showGrandUnicorn) {
      // Clicking 15 times summons the grand unicorn - which is centered on the screen.
      div.style.top = '50%'
      div.style.left = '50%'
      div.style.zIndex = '143143143'
    } else {
      // Otherwise we randomize the position.
      div.style.top = `${Math.round(Math.random() * 100)}%`
      div.style.left = `${Math.round(Math.random() * 100)}%`

      transform += ` rotate(${Math.round(Math.random() * 10 - 5)}deg)`
    }

    // Create the image element.
    const img = document.createElement('img')
    img.style.opacity = '0'
    img.style.transition = 'all .1s linear'
    img.alt = 'A lovely unicorn or rainbow'
    img.onload = () => {
      img.style.opacity = '1'
    }

    // Used as a cache buster so the browser makes a new request every time instead of usign the previous, cached one.
    const currentTime = new Date()
    let submitTime = currentTime.getTime()

    if (showGrandUnicorn) {
      // Caching doesn't matter for the Grand Unicorn.
      submitTime = 0
    }

    // Construct our unicorn & rainbow request.
    let url = `${cornify_url}getacorn.php?r=${submitTime}&url=${document?.location.href}`

    // Add younicorns if requested.
    if (options && (options.y || options.younicorns)) {
      url += `&y=${options.y ? options.y : options.younicorns}`

      if (Math.random() > 0.5) {
        // Flip horizontally at random.
        if (transform.length > 0) {
          transform += ' scaleX(-1)'
        }
      }
    }

    div.style.transform = transform
    // div.style.MozTransform = transform;
    div.style.webkitTransform = transform

    img.setAttribute('src', url)

    // Add a nice hover wigggle.
    img.style.transition = 'all .1s linear'

    div.onmouseover = () => {
      const size = 1 + Math.round(Math.random() * 10) / 100
      const angle = Math.round(Math.random() * 20 - 10)
      const result = `rotate(${angle}deg) scale(${size},${size})`
      img.style.transform = result
      // img.style.MozTransform = result;
      img.style.webkitTransform = result
    }

    div.onmouseout = () => {
      const size = 0.9 + Math.round(Math.random() * 10) / 100
      const angle = Math.round(Math.random() * 6 - 3)
      const result = `rotate(${angle}deg) scale(${size},${size})`
      img.style.transform = result
      // img.style.MozTransform = result;
      img.style.webkitTransform = result
    }

    // Append our container DIV to the page.
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(div)
    div.appendChild(img)

    // Hooray - now we have a sparkly unicorn (or rainbow) on the page. Another cornification well done. Congrats!

    // When clicking 5 times, add a custom stylesheet to make the page look awesome.
    if (cornifyCount == 5) {
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
      cornify.replace()
    }

    cornify.updateCount()

    // Trigger an event on the document.
    const event = new Event('cornify')
    document.dispatchEvent(event)
  },

  // Tracks how often we cornified.
  updateCount() {
    const id = '__cornifyCount'
    let p = document.getElementById(id)

    if (p == null) {
      p = document.createElement('p')
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
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(p)
    }

    if (cornifyCount == 1) {
      p.innerHTML = 'You cornified!'
    } else {
      p.innerHTML = `You cornified ${cornifyCount} times!`
    }

    // Stores our count in a cookie for our next session.
    cornify.setCookie('cornify', `${cornifyCount}`, 1000)
  },

  setCookie(name: string, value: string, days: number) {
    const d = new Date()
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${name}=${value}; ${expires}`
  },

  getCookie(cname: string) {
    const name = `${cname}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim()
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },

  // Adds happy words at the beginning of all headers on the page.
  replace() {
    let headerTypeIndex = 6
    let headerElements
    let headerElement
    let i
    const magicalWords = [
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

    while (headerTypeIndex >= 1) {
      headerElements = document.getElementsByTagName(`h${headerTypeIndex}`)

      for (i = 0; i < headerElements.length; i++) {
        headerElement = headerElements[i]
        headerElement.innerHTML = `${
          magicalWords[Math.floor(Math.random() * magicalWords.length)]
        } ${headerElement.innerHTML}`
      }

      headerTypeIndex -= 1
    }
  },

  // Clicking the rainbow cupcake button makes all the unicorns
  // disappear (should only be used in an emergency, since it's sad).
  remove() {
    const corns = Array.from(document.querySelectorAll('.__cornify_unicorn'))
    if (corns) {
      for (let i = 0; i < corns.length; i++) {
        corns[i].parentNode?.removeChild(corns[i])
      }
    }

    // Remove our counter.
    const countButton = document.getElementById('__cornifyCount')
    if (countButton && countButton.parentNode) {
      countButton.parentNode.removeChild(countButton)
    }

    // Remove the cupcake button.
    const cupcakeButton = document.getElementById('__cornify_cupcake_button')
    if (cupcakeButton && cupcakeButton.parentNode) {
      cupcakeButton.parentNode.removeChild(cupcakeButton)
    }

    window.removeEventListener('keydown', cornify.addKeyboardEvent)
  },

  // Add the rainbow cupcake button to the page.
  addCupcakeButton() {
    const id = '__cornify_cupcake_button'
    const doc = document
    let button = doc.getElementById(id)

    if (!button) {
      button = doc.createElement('div')
      button.id = id
      button.onclick = cornify.remove
      button.style.position = 'fixed'
      button.style.top = '10px'
      button.style.right = '10px'
      button.style.zIndex = '2147483640'
      button.setAttribute('aria-label', 'Hide unicorns and rainbows')

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
      button.appendChild(image)

      doc.getElementsByTagName('body')[0].appendChild(button)
    }
  },
}

export default cornify
