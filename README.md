# 🦄 Unicorns and Rainbows on-demand with this React Hook!

[![Build Status](https://travis-ci.org/daphnesmit/use-cornify.svg?branch=master)](https://travis-ci.org/daphnesmit/use-cornify)
![GitHub issues](https://img.shields.io/github/issues/daphnesmit/use-cornify)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

The Cornify script gives you the magical power to put unicorns and rainbows on any website on the Internet. Since 2009, it has served over 400 million unicorns and rainbows. How wonderful indeed.

And today: You can use it as a React Hook!

## 🎉 How to use the hook

Check out the [/example](https://github.com/daphnesmit/use-cornify/tree/master/example) directory for a full fletched example of the hook.
A demo can be found here: [use-cornify.surge.sh](https://use-cornify.surge.sh)

```typescript
/**
 * useCornify
 * 
 * @param {string[]} [keys=['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']]
 * @param {boolean} [addCupcakeButton=true] 
 * @param {boolean} [addMagicalWords=true]
 * @param {string} [younicorns]
 */
const { remove } = useCornify({
  keys: ['ArrowUp', 'ArrowDown', 'Enter'],
  showCupCakeButton: false,
  addMagicalWords: false,
  younicorns: '12,957,826,716,386'
})

// To manually remove all unicorns
remove()
```

## 🙈 Add summing Younicorns

These days, you can create your own personal unicorns on Cornify. They are called Younicorns. If you want the Cornify script to show your Younicorns, you can provide a list of Younicorn IDs to the script, like this:

`useCornify({ younicorns: "12,957,826,716,386" });`

To find the IDs, navigate your browser to a Younicorn page and look at the URL. It will include a number - that's the ID.


## 🙌 Credits

Big thanks to:

__Unicorns & Rainbows On-Demand__ </br>
http://www.cornify.com
