# 🦄 Unicorns and Rainbows on-demand with this React Hook!

The Cornify script gives you the magical power to put unicorns and rainbows on any website on the Internet. Since 2009, it has served over 400 million unicorns and rainbows. How wonderful indeed.

And today: You can use it as a React Hook!

## 🙌 How to use the hook

```
const { remove } = useCornify({ 
  keys: ['ArrowUp', 'ArrowDown', 'Enter'], 
  addCupcakeButton: false,
})

// To manually remove all unicorns
remove()
```

## 🚧 Todo: Add summing Younicorns option to config

These days, you can create your own personal unicorns on Cornify. They are called Younicorns. If you want the Cornify script to show your Younicorns, you can provide a list of Younicorn IDs to the script, like this:

`cornify.add({ younicorns: "12,957,826,716,386" });`

To find the IDs, navigate your browser to a Younicorn page and look at the URL. It will include a number - that's the ID.
