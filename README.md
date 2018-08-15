# badGui
A very bad module that you should fix

[![Discord](https://discordapp.com/api/guilds/385946679733518338/widget.png)](https://discord.gg/dzB7xZK)

![wpw](https://i.imgur.com/YnHP87W.png)
****
[pls giv monei](https://ko-fi.com/codeagon)
****
## What this mod does
badGui is a bad module written by an utter idiot(me), it provides a "convenient" way of providing an ingame UI to module developers. This is more of a proof of concept rather than an actual good thing.

Some of the neater stuff it can do is
- Easily provide clickable links and images that are executed as command commands.
- [Control various UI components ](https://github.com/codeagon/GUI-Controller)
- Probably other stuff too!

## How to use
For users, all you have to do is install this like a normal tera-proxy module.

For module developers, just require it like normal (see [GUICi](https://github.com/codeagon/GUI-Controller) or just read the source it's like 5 lines).
Example :
```
const BadGui = require('badGui')

module.exports = function (mod) {
    const gui = new BadGui(mod)
    mod.command.add('testo', () => {
        gui.parse([{ text: `Test text!`, command: `fps mode 3`, img: `icon_items.homonculus1_tex` }], 'This is a test!')
    })
    this.destructor = () => {
        mod.command.remove('gc');
    };
}
```
