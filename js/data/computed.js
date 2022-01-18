const computed = {
    isMeta: function()
    {
        return game.metaLayer.active;
    },
    isLayerCategory: function()
    {
        category = null
        switch(game.settings.tab)
        {
            case "Layers":
            case "Automators":
            case "Volatility":
            case "Aleph":
            case "Restack":
                category = "Layers";
                break;
            case "Guide":
            case "Changelog":
                category = "Guide";
                break;
            case "Achievements":
            case "Secret Achievements":
                category = "Achievements";
                break;
            case "Settings":
                category = "Settings";
                break;
        }
        return category
    }
};