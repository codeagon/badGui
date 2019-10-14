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
                blep = event.command.split(";").join(",").split("|").join(",").split(",")//split(/;|\|/) btw
                blep.forEach(
                    function (cmd) {
                        dispatch.command.exec(cmd);
                    })
                return false
            })
        }
    }

    parse(array, title, mode) { // rename dis to sumthin not dum
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

//TODO: Implement thing, remove unused count stuff



function thonk(array) {
    isFinished = false
    const notJustGPK = array.some(function (b) {
        return (b.text || b.command || b.img);
    });
    if (notJustGPK) {
        for (var i = 0; i < array.length; i++) {
            count++
            if (array[i].command == null && !isFinished) {
                if (array[i].img != null && array[i].gpk == null) {
                    shoveData(`<img src='img://__${array[i].img}'></img>${array[i].text}`)
                } else
                    if (array[i].img != null && array[i].gpk != null && array[i].text != null) {
                        shoveData(`<a href='asfunction:_parent.SendCommand,${array[i].gpk}'><img src='img://__${array[i].img}'></img></a>${array[i].text}`)
                    } else
                        if (array[i].img == null && array[i].gpk != null && array[i].text != null) {
                            shoveData(`<a href='asfunction:_parent.SendCommand,${array[i].gpk}'>${array[i].text}</a>`)
                        } else
                            /*if (array[i].img == null && array[i].gpk != null && array[i].text == null && array[i].command == null) {
                                this.dispatch.send('S_ANNOUNCE_UPDATE_NOTIFICATION', 1, { //hehehdfeehuydhauDHSAUDHAS
                                    id: 0,
                                    title: title,
                                    body: `###${array[i].gpk}`
                                })
                            }
                            else*/
                            if (array[i].img == null && array[i].gpk == null && array[i].text != null) {
                                shoveData(`${array[i].text}`)
                            }
            } else //yes I am aware this is disgusting code that could easily be simplified
                if (array[i].img != null && array[i].command !== null && !isFinished) {
                    shoveData(`<a href='admincommand:/@${array[i].command}'><img src='img://__${array[i].img}'></img></a>${array[i].text} `)
                } else
                    if (array[i].img == null && array[i].command !== null && !isFinished) {
                        shoveData(`<a href='admincommand:/@${array[i].command}'>${array[i].text}</a>`)
                    }
        }
    } else {
        if (array.length <= 1) {
            for (var i = 0; i < array.length; i++) {
                count++
                if (array[i].gpk.includes("#")) {
                    shoveData(`##${array[i].gpk}`)
                    break
                } else
                    shoveData(`@@@${array[i].gpk}`)
                break
            }
        }
        else {
            console.log(`Badgui: error - seems like you're trying to send multiple GPK commands, use | instead`)
        }
    }
    count = 0
    return meme
}



module.exports = badGui;
