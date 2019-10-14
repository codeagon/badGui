# BadGUI2
Bad GUI 2 - Badder GUI - the update instead of the mod

---

[Give me literally all your money](https://ko-fi.com/codeagon)

---

[[toc]]

---
This was going to be a new mod but instead it's an update because I didn't want to break things and am also lazy.
# Usage
## For users
- Click install
- Go download some mods that use this
- that's it
## For developers
It's pretty much just badGUI except sometimes things you feed it are spat out as a GPK broadcast thing.

For a full list of GPK functions, either search through the S1UI functions yourself using JPEXS and Terahelper or [look in this repo for pre-decompiled versions.](https://github.com/codeagon/scrip) Some newer UI elements may be missing listeners, for example ShortCut (Which ingame is loaded as TestQuickSlot/ex/ex2 rather than ShortCut.gpk) and are therefore pretty useless unless you want to add em in.

A cut down version of what you're looking for is anything that's for example like `myListener.OnGameEventSetInvenMoney = function(invenMoney, invenTCat, invenCMoney)`. You would then call this in BadderGUI2 by doing something like`gui.parges( [{command: "OnGameEventSetInvenMoney,420000,420", "title goes after" }])`if you wanted to change your inventory to look like you had 420000 gold and 420 TCat token things.

As BadderGUI uses UpdateNotification for its payloads, anything written there previously will be overwritten/vanish upon next payload.

### Syntax / Additions
BadderGUI2 comes with a few differences to badGUI. 
Arg| Description
---|---
gpk | Executes an internal command, multiple commands can be sent by separating them with `|`. When no text is given, commands execute right away and no window is shown.
text| Works like the previous version but the GPK now contains a replacer for {@}{/@} that will now create a clickable link that executes a GUI command. You'll need to include a `'>` after the command for text since I'm lazy and don't want to touch AS2 again.
command| Creates a clickable link that will execute a proxy command
img| Places an image. Will be clickable if gpk or command are present
For titles of the window, they go after the "data" array. For example, ```gui.parse([text: `Hi this is some text`], `hi this is a title for some text)` ```

### Examples
An example mod is the [new and updated GUICI.](https://github.com/codeagon/GUI-Controller), however it's only been updated to use the direct GPK command rather than QoL commands.

Additionally heres a few example cases for syntax
- **Pipes/Chaining**: 
  - ```gui.parse([gpk: `OnGameEventShowUI,Inventory,1|OnGameEventSetInvenMoney,420000,420|OnGame_InventoryWindow_SetSlotLine,0"], "Wow A title!") ```
  - Opens the inventory, sets the money, and sets the amount of slots in it to 0
  - For **toolbox commands**, you can either use `;` or `|` (`;`is there still just for backward compat)
  - ```command: `fps hide Kasea;fps gui hide` ```
- **GPK clickable links**
  - `text: "Hi my name is dong and you can click on this" gpk: "OnGameEventShowUI,Inventory,1"`
  - Alternatively you can still of course just call the function normally `<a href='asfunction:_parent.ToGame_DongMode,OnGameEventShowUI,Inventory'>Open the Inventory here fam</a>`, the same goes for all features.
- **Images**
  - Just like badGUI you can still use images in the GUI/create clickable links with them.
  - `img: "icon_items.homonculus1_tex" command: "fps mode 2"`
  - Places the AA (RIP in peace) mascot in. Will be a clickable object if `gpk` or `command`are present.
- **Proxy Commands**
  - ```gui.parse([{ text: `Test text!`, command: `fps mode 3`, img: `icon_items.homonculus1_tex` }])```
  - Will Place text, an image, and have it all be a clickable proxy command
  - Works just like before, for a good(bad) example see [FPS-Utils](https://github.com/codeagon/fps-utils)
  - Does not stack with GPK commands obviously 
### Interesting functions for you and your friends
This is just a list of some things I've stumbled on that devs could use to make interesting mods.

## Future plans
- Ideally a way to access more elements of the UI. I'm still not sure how the heck the new UI elements work or why they have no unique listeners.
- Maybe some more QoL code for easily making UI elements
