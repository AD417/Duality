//General Data
let player, tmp;
let D = x => new Decimal(x); //I'm lazy. 
let getEl = x => document.getElementById(x);
let basePlayer = { 
    firstTick: Date.now(),
    lastTick: Date.now(),
    version: 0.001,
    //stage: 0,

    love: D(1),
    dLove: D(0),
    hate: D(0),
    //dHate: D(0), //We dont need it yet. 

    dual: D(0), //Might not have to be a decimal?
    upgs: [false, false, false, false],
    repeatable: [0, 0, 0, 0],

    resets: {
        dual: 0,
        dualForced: 0
    },

    testVar: "Anthios made this you forkin idiots"
};

function tab(tabID) {
    let i, tabcontent, tablinks;
  
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    getEl([null, "Main", "Duality", "Options", "Statistics", "DevLog"][tabID]).style.display = "block";
    //setUpCanvas(tabID)
}

function load() {
    tab(1)
    let parse = localStorage.getItem("save");
    try {
        player = JSON.parse(atob(parse));
        player = check(player, basePlayer);
    } catch (e) {
        newGame();
    }
    player = decimalify(player); //Give everything its code-mandated Break
    setup() //load in everything that is not updated on every tick. 
    setupTemp();
    setInterval(loop, 50);
    setInterval(save, 10000);
}

function setup() {
    if (hasDualReset()) getEl("dualTab").style.display = "inline-block"
}

function check(val, base) {
    if (base instanceof Object && !(base instanceof Decimal)) {
        if (val === undefined) return base;
        let i;
        for (i in base) {
            val[i] = check(val[i], base[i]);
        }
        return val;
    } else {
        if (val === undefined) return base;
        return val;
    }
}

function decimalify(val) {
    if (val instanceof Object && !(val instanceof Decimal)) {
        let i;
        for (i in val) {
            val[i] = decimalify(val[i]);
        }
        return val;
    } else if (typeof(val) === "string" && !isNaN(parseInt(val))) {
        return D(val);
    }
    return val;
}

function newGame() {
    basePlayer.lastTick = Date.now();
    basePlayer.firstTick = Date.now()
    player = decimalify(JSON.parse(JSON.stringify(basePlayer)));
    setup()
}

function setupTemp() {
    tmp = { // Do we need this? None of this is actually needed in a tmp variable. 
        dSpace: D(0),

        spaceTimeLastTick: D(0),
        dSpaceTime: D(0),
    }
}

function save() {
    if (canSave()) {
        localStorage.setItem("save", btoa(JSON.stringify(player)));
    }
    //console.log("Game saved.")
}

function canSave() {
    return true; //ToDo... not now, but eh.
}

function reset() {
    if (!confirm("are you suuuuuuuuurrrreeee????")) return;
    newGame();
}

//Game Loop stuff

function loop(diff) {
    if (typeof(diff) === "undefined") {
        diff = Date.now() - player.lastTick;
        player.lastTick += diff;
    }
    //Numbers
    updateLove(diff);
    updateHate(diff);

    //General stuff
    updateStatistics();
    //updateAnimationData();
}

function updateStatistics() {
    //getEl("statTime").innerHTML = display(player.time);
    //getEl("statSpace").innerHTML = display(player.totalSpace);
    getEl("playtime").innerHTML = display(Math.floor((player.lastTick - player.firstTick) / 1000));
}
