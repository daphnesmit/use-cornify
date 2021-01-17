import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useCornify } from '../src'

const App = () => {
  const { remove } = useCornify({
    addCupcakeButton: true,
    addMagicalWords: true,
    younicorns: '12,957,826,716,386',
  })

  return (
    <div
      style={{
        fontFamily: 'arial, verdana, sans-serif',
        margin: '20vmin auto',
        textAlign: 'center',
      }}>
      <h1>Unicorns & Rainbows!</h1>
      <h2>Type konami code: ↑ ↑ ↓ ↓ ← → ← → B A</h2>
      <button onClick={() => remove()}>Remove Unicorns</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
