function updateLove(diff) {
    player.love = player.love.add(player.dLove.times(diff / 1000));
    getEl("love").innerHTML = display(player.love);
}

function updateHate(diff) {
    if (!hateAllowed()) return
    player.hate = player.hate.add(1).times(Decimal.pow(1.1, diff/1000)).sub(1); //basically 1.1^x - 1, where x is time.
    if (player.hate.gt(player.love)) resetDual(true);
    getEl("hate").innerHTML = display(player.hate);
}

function hateAllowed() {
    return player.dLove.gt(0)
}

function resetDual(forced) {
    let resetData = player.resets;

    player.love = D(1);
    player.hate = D(0);
    resetData.dual++;

    if (forced) {
        if (!resetData.dualForced) {
            getEl("dualTab").style.display = "inline-block";
            tab(2);
        }
        resetData.dualForced++;
        player.dual = player.dual.add(1); //may change later
    }
    player.dLove = D(0)
}

function hasDualReset() {
    return player.resets.dual > 0; // next layer
}

function getLoveMaker() {
    let loveMakerCost = Decimal.pow(2, player.dLove);
    if (player.love.lt(loveMakerCost) || (player.dLove.gte(1) && true)) return; //the "true" is for "do you have a certain upg"
    player.love = player.love.sub(loveMakerCost);
    player.dLove = player.dLove.add(1);
}

//--------------------------------------------------------------------------------------------

const dUpgs = {
    u11: "Hate increases slower",
    u12: "Double love gain",
    u13: "Increase duality gain",
    u14: (player.repeatable[3] ? "Decrease love activator's delay" : "Create a love activator."),
}
const dEffects = {
    u11() { 
        return D(player.repeatable[0])
    },
    u12() {
        return Decimal.pow(2,player.repeatable[1])
    },
    u13() {
        return D(player.repeatable[2])
    },
    u14() {
        return Math.min(30 * Math.pow(0.4, player.repeatable[3]), 0.05) //Caps after almost exactly 7 upgrades. plan around that. 
    }
}
const dCost = {
    u11() {
        return Decimal.pow(2, player.repreatable[0])
    },
}