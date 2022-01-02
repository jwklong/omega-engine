const computed = {
    isMeta: function()
    {
        return game.metaLayer.active;
    },
    canHack: function()
    {
        return game.restackLayer.upgradeTreeNames.unlockHackers.apply();
    }
};