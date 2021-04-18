function updateLove(diff) {
    player.love = player.love.add(1 * diff / 1000);
    getEl("love").innerHTML = display(player.love);
}

function updateHate(diff) {
    player.hate = player.hate.add(1).times(Decimal.pow(1.1, diff/1000)).sub(1); //basically 1.1^x - 1, where x is time.
    if (player.hate.gt(player.love)) resetDual(true);
    getEl("hate").innerHTML = display(player.hate);
}

function resetDual(forced) {
    let resetData = player.resets;

    player.love = D(0);
    player.hate = D(0);
    resetData.dual++;

    if (forced) {
        if (!resetData.dualForced) {
            getEl("dualTab").style.display = "inline-block"
            tab(2);
        }
        resetData.dualForced++;
        player.dual = dual.add(1); //may change later
    }

}

function hasDualReset() {
    return player.resets.dual > 0; // next layer
}