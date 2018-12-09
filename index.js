const map = new WeakMap();
let blep

class badGui {
    constructor(dispatch) {
        this.dispatch = dispatch;

        const base = dispatch.base || dispatch;

        if (!map.has(base)) {
            map.set(base, {});

            dispatch.hook('C_CONFIRM_UPDATE_NOTIFICATION', 1, () => {
                return false
            })

            dispatch.hook('C_ADMIN', 1, (event) => {
                blep = event.command.split(";")
                blep.forEach(
                    function (cmd) {
                        dispatch.command.exec(cmd);
                    })
                return false
            })
        }
    }

    parse(array, title, mode) { // rename dis to sumthin not dum
        if (mode == 2) {
            this.dispatch.send('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, {
                id: 0,
                title: title,
                body: squonk(array, mode)

            })
            meme = ''
            txtArray = ['cools']
        } else
            this.dispatch.send('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, {
                id: 0,
                title: title,
                body: thonk(array, mode)
            })
        meme = ''
    }

}
let meme = ''
let count = 0,
    imgCount = 1,
    textCount = 0,
    firstText = true,
    txtArray = [],
    isFinished = 0

function shoveData(stuff, mode) {
    if (meme.length >= 16000) {
        meme += `GUI Data Limit Exceeded, some values may be missing`
        isFinished = true
        return
    }
    if (count >= 7 && mode == 1) {
        meme += `<br>${stuff}`
        count = 1
    } else {
        meme += stuff
    }
    //default mode do nuffin
}


function thonk(array) {
    isFinished = false
    for (var i = 0; i < array.length; i++) {
        count++
        if (array[i].command == null && !isFinished) {
            if (array[i].img != null) {
                shoveData(`<img src='img://__${array[i].img}'></img>${array[i].text}`)
            }
            shoveData(`${array[i].text}`)

        } else
            if (array[i].img != null && array[i].command !== null && !isFinished) {
                shoveData(`<a href='admincommand:/@${array[i].command}' ><img src='img://__${array[i].img}'></img></a>${array[i].text} `)
            } else
                if (array[i].img == null && array[i].command !== null && !isFinished) {
                    shoveData(`<a href='admincommand:/@${array[i].command}'>${array[i].text}</a>`)
                }
    }
    //console.log(`Finished stuff ${meme}`) //dispatch here
    count = 0
    return meme
}

function squonk(array) { // should probably just delete this entire thing
    for (var i = 0; i < array.length; i++) {
        if (imgCount <= 5) {
            imgCount++
            txtArray.push(array[i].text)
            meme += `<a href='admincommand:/@${array[i].command}'><img src='img://__${array[i].img}'></img></a> &#09; `
            //console.log(imgCount)
        } if (txtArray.length == 5) {
            console.log('else')
            firstText = true
            for (var j = 0; j < txtArray.length; j++) {
                console.log(txtArray[j])
                // console.log(txtArray)
                if (j == 4) {
                    // console.log('BEEEEEEEEEEEEEEP')
                    meme += `${txtArray[j]}<br>`
                    imgCount = 0
                    txtArray = []
                    firstText = true
                }
                if (firstText == true && j != 4) {
                    meme += `<br> &#09;${txtArray[j]} &#09;&#09;`
                    firstText = false
                } else if (j != 4) {
                    meme += `${txtArray[j]} &#09;&#09;&#09;`
                }
            }
            imgCount = 0
            txtArray = []
            //console.log(txtArray.length)
            firstText = true
        }
    }
    return meme
}
module.exports = badGui;
