const functions = {
    formatNumber: function(n, prec, prec1000, lim = new Decimal(1000))
    {
        if(typeof n === "number")
        {
            n = new Decimal(n);
        }
        if(n.mag === Infinity)
        {
            return "Infinite";
        }
        if(n.lt(0))
        {
            return "-" + this.formatNumber(n.mul(-1), prec, prec1000, lim);
        }
        if(n.lt(Decimal.pow(0.1, Math.max(1, prec1000))) && n.neq(0))
        {
            return "1/" + this.formatNumber(n.pow(-1), prec, prec1000, lim);
        }
        if(n.lt(lim))
        {
            let num = n.toNumber();
            if(Object.is(num, -0)) num = 0; //weird
            return num.toLocaleString("en-us", {minimumFractionDigits: prec1000, maximumFractionDigits: prec1000});
        }
        if(n.layer === 0)
        {
            return n.gte(1000) ? n.toNumber().toExponential(prec).replace(/\+/g, "") : n.toNumber().toFixed(prec1000);
        }
        if(n.layer === 1)
        {
            const diff = Math.ceil(n.mag) - n.mag;
            let mag = n.mag;
            if(diff < 1e-10)
            {
                mag = Math.ceil(mag);
            }
            return Decimal.pow(10, mag % 1).toFixed(prec) + "e" + Math.floor(mag).toLocaleString("en-us", {minimumFractionDigits:0 , maximumFractionDigits:0});
        }
        return "e".repeat(n.layer) + n.mag.toLocaleString("en-us", {minimumFractionDigits: prec , maximumFractionDigits: prec});
    },
    formatTime: function(s)
    {
        const times = [Math.floor(s / 60) % 60, Math.floor(s) % 60];
        if(s >= 3600)
        {
            times.unshift(Math.floor(s / 3600) % 24);
        }
        if(s >= 3600 * 24)
        {
            times.unshift(Math.floor(s / (3600 * 24)));
        }
        return times.map(t => t.toString().padStart(2, "0")).join(":");
    },
    generateLayer: function(id)
    {
        const rand = new Random(id);
        let possibleFeatures = FeatureUnlockManager.getFeatures(id);
        let features = [];
        for(let i = 0; i < 3; i++)
        {
            const f = possibleFeatures[rand.nextInt(possibleFeatures.length)];
            possibleFeatures = possibleFeatures.filter(feature => feature !== f);
            features.push(f);
        }
        game.layers.push(new PrestigeLayer(id, features));
    },
    setCurrentLayer: function(l)
    {
        game.currentLayer = l;
    },
    setPreviousLayer: function()
    {
        if(game.currentLayer.layer > 0 && game.settings.tab === "Layers")
        {
            this.setCurrentLayer(game.layers[game.currentLayer.layer - 1]);
        }
    },
    setNextLayer: function()
    {
        if(game.currentLayer.layer < game.layers.length - 1 && game.settings.tab === "Layers")
        {
            this.setCurrentLayer(game.layers[game.currentLayer.layer + 1]);
        }
    },
    maxLayerUnlocked: function()
    {
        return game.layers.length - 1;
    },
    setTheme: function(css)
    {
        document.getElementById("theme").href = css;
        game.settings.theme = css;
    },
    setFont: function(css)
    {
        document.getElementById("font").href = css;
        game.settings.font = css;
    },
    setNames: function(stuff)
    {
        if (stuff == "refresh") {
            window.location.reload();
            return
        }
        if (stuff[2].length != 4 && mod.debugMode == true) {
            console.warn(`${stuff[2].length} infinity symbols detected in layer names, expected 4`)
        }
        game.settings.layerNames = stuff;
        [LETTERS, ORDERS, GIANTS] = stuff;
    },
    setSave: function(info)
    {
        this.saveGame()
        game.settings.saveInfo = info
        this.hardResetGame(true)
        this.loadGame()
    },
    createNotification: function(notification)
    {
        if (localTimer > 1){game.notifications.push(notification)}
    },
    getSaveString()
    {
        const replacer = function(key, value)
        {
            if(key === "currentChallenge")
            {
                return value !== null && typeof(value) !== "undefined" && game.layers[value.layer.layer] ? {layer: value.layer.layer, index: game.layers[value.layer.layer].challenges.findIndex(c => c === value)} : null;
            }
            if(key === "settings")
            {
                return undefined;
            }
            if(value instanceof PrestigeLayer)
            {
                return {challenges: value.challenges, generators: value.generators, powerGenerators: value.powerGenerators,
                        upgrades: value.upgrades, treeUpgrades: value.treeUpgrades, power: "d" + value.power, resource: "d" + value.resource,
                        totalResource: "d" + value.totalResource, maxResource: "d" + value.maxResource, timeSpent: value.timeSpent, timesReset: value.timesReset};
            }
            if(value instanceof Achievement)
            {
                return {title: value.title, isCompconsted: value.isCompconsted};
            }
            if(value instanceof AlephLayer)
            {
                return {aleph: "d" + value.aleph, upgrades: value.upgrades};
            }
            if(value instanceof Generator)
            {
                return {amount: "d" + value.amount, bought: "d" + value.bought};
            }
            if(value instanceof AbstractUpgrade)
            {
                return {level: "d" + value.level};
            }
            if(value instanceof Challenge)
            {
                return {level: value.level};
            }
            if(value instanceof Automator)
            {
                return {upgrade: value.upgrade, active: value.active, desiredInterval: value.desiredInterval};
            }
            if(value instanceof ReStackLayer)
            {
                return {layerCoins: "d" + value.layerCoins, permUpgrades: value.permUpgrades, metaUpgrade: value.metaUpgrade, upgradeTree: value.upgradeTree, timeSpent: value.timeSpent};
            }
            if(value instanceof MetaLayer)
            {
                return {active: value.active, resource: "d" + value.resource, layer: "d" + value.layer, multiplierUpgrades: value.multiplierUpgrades,
                    powerUpgrades: value.powerUpgrades};
            }
            return value;
        }
        return btoa(unescape(encodeURIComponent(JSON.stringify(game, replacer))));
    },
    getSettingsSaveString: function()
    {
        return btoa(unescape(encodeURIComponent(JSON.stringify(game.settings))));
    },
    saveGame: function()
    {
        game.timeSaved = Date.now();
        try
        {
            localStorage.setItem(mod.primaryName+mod.secondaryName+game.settings.saveInfo, this.getSaveString());
            localStorage.setItem(mod.primaryName+mod.secondaryName+"_Settings"+game.settings.saveInfo, this.getSettingsSaveString());
            localStorage.setItem(mod.primaryName+mod.secondaryName+"_SaveInfo", game.settings.saveInfo);
            if(game.settings.notifications && game.settings.saveNotifications)
            {
                functions.createNotification(new Notification(NOTIFICATION_STANDARD, "Game Saved!", "images/save.svg"));
            }
        }
        catch(e)
        {
            if(game.settings.notifications && game.settings.saveNotifications)
            {
                functions.createNotification(new Notification(NOTIFICATION_ERROR, "Error Saving Game", "images/save.svg"));
            }
        }
    },
    loadGame(str)
    {
        let loadObj;
        const isImported = typeof(str) !== "undefined";
        game.settings.saveInfo = game.settings.saveInfo === "i have no idea" ? localStorage.getItem(mod.primaryName+mod.secondaryName+"_SaveInfo") || "" : game.settings.saveInfo
        str = str || localStorage.getItem(mod.primaryName+mod.secondaryName+game.settings.saveInfo) || null;
        if(str === null) return;
        if(str === "?")
        {
            functions.setTheme("broken.css");
            return -1;
        }
        try
        {
            const reviver = function(key, value)
            {
                if(key === "theme") return value;
                if(typeof value === "string" && value.startsWith("d"))
                {
                    return new Decimal(value.replace("d", ""));
                }
                return value;
            };
            loadObj = JSON.parse(decodeURIComponent(escape(atob(str))), reviver);
        }
        catch(e)
        {
            console.warn("hello your save broke :(\n", e.stack);
            return false;
        }

        game.timeSpent = typeof(loadObj.timeSpent) !== "undefined" ? loadObj.timeSpent : 0;
        game.highestLayer = typeof(loadObj.highestLayer) !== "undefined" ? loadObj.highestLayer : 0;
        game.highestUpdatedLayer = typeof(loadObj.highestUpdatedLayer) !== "undefined" ? loadObj.highestUpdatedLayer : 0;
        game.layers = [];
        for(let i = 0; i < loadObj.layers.length; i++)
        {
            if(!game.layers[i])
            {
                functions.generateLayer(i);
            }
            game.layers[i].loadFromSave(loadObj.layers[i]);
        }
        if(!game.layers[0])
        {
            functions.generateLayer(0);
        }
        game.currentLayer = game.layers[0];
        if(loadObj.currentChallenge)
        {
            game.currentChallenge = game.layers[loadObj.currentChallenge.layer].challenges[loadObj.currentChallenge.index];
        }
        if(loadObj.volatility)
        {
            for(const k of Object.getOwnPropertyNames(loadObj.volatility))
            {
                game.volatility[k].level = loadObj.volatility[k].level;
            }
        }
        if(loadObj.alephLayer)
        {
            game.alephLayer.loadFromSave(loadObj.alephLayer);
        }
        else
        {
            game.alephLayer = new AlephLayer();
        }
        if(loadObj.automators)
        {
            for(const k of Object.keys(loadObj.automators))
            {
                game.automators[k].loadFromSave(loadObj.automators[k]);
            }
        }
        if(loadObj.achievements)
        {
            for(const ach of loadObj.achievements)
            {
                const idx = game.achievements.findIndex(a => a.title === ach.title);
                if(idx !== -1)
                {
                    game.achievements[idx].isCompleted = ach.isCompleted;
                }
            }
        }
        if(loadObj.restackLayer)
        {
            game.restackLayer.load(loadObj.restackLayer);
        }
        else
        {
            game.restackLayer = new ReStackLayer();
        }
        if(loadObj.metaLayer)
        {
            game.metaLayer.load(loadObj.metaLayer);
        }
        else
        {
            game.metaLayer = new MetaLayer();
        }

        if(localStorage.getItem(mod.primaryName+mod.secondaryName+"_Settings") !== null)
        {
            try
            {
                const settings = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem(mod.primaryName+mod.secondaryName+"_Settings"+game.settings.saveInfo)))));
                settings.saveInfo = game.settings.saveInfo
                game.settings = Object.assign(game.settings, settings);
                game.settings.tab = "Layers"
            }
            catch(e)
            {
                console.warn("Error setting settings\n", e.stack);
            }
        }
        this.setTheme(game.settings.theme)
        this.setNames(game.settings.layerNames)
        this.setFont(game.settings.font)

        if(game.version !== loadObj.version)
        {
            if(loadObj.version === "1.0" || loadObj.version === "1")
            {
                for(const l of game.layers)
                {
                    if(!l.isNonVolatile() && l.hasTreeUpgrades())
                    {
                        l.respecUpgradeTree();
                    }
                }
            }
        }

        if(!isImported && game.settings.offlineProgress && loadObj.timeSaved !== undefined)
        {
            const t = (Date.now() - loadObj.timeSaved) / 1000;
            if(t >= 60) //after offline for over 60 seconds
            {
                document.querySelector("#loading > p").innerHTML = "Applying Offline Progress...";
                simulateGameTime(t);
                functions.createNotification(new Notification(NOTIFICATION_STANDARD, "You were offline for " + functions.formatTime(t)));
            }
        }
        localTimer = 0
        return true;
    },
    hardResetGame: function(changeSave)
    {
        if (changeSave !== true) {
        let confirmations = 0;
        do
        {
            if(!confirm("Are you " + "really ".repeat(confirmations) + "sure? There is no way back. " +
                "Click " + (3 - confirmations) + " more " + (confirmations >= 2 ? "time" : "times") + " to restart."))
            {
                return;
            }
            confirmations++;
        } while(confirmations < 3)
        localStorage.setItem(mod.primaryName+mod.secondaryName+game.settings.saveInfo, null);
        }
        game.currentLayer = null;
        game.layers = [];
        functions.generateLayer(0);
        functions.loadGame(initialGame);
        game.currentLayer = game.layers[0];
        temp.endgameOverride = false
        game.settings.tab = "Layers"
    },
    hslToHex: function(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    },

    textColor: function(layer)
    {
        const lid = new Decimal(layer);
        if(lid.gte(mod.Infinities[3]))
        {
            return "#ffffff";
        }
        if(lid.gte(mod.Infinities[2]))
        {
            return "#ff9100";
        }
        if(lid.gte(mod.Infinities[1]))
        {
            return "#00ffb7";
        }
        if(lid.gte(mod.Infinities[0]))
        {
             return "#ff00ff";
        }
        if(lid.lt(0))
        {
             return "#000000";
        }
        let h = 33 * Math.min(lid.toNumber(), 10000);
        if(lid.gt(10000))
        {
            h += Decimal.log10(lid.div(10000)).toNumber() * 600;
        }
        let s = Math.min(100, 10 * layer);
        return this.hslToHex(h,s,50);
    },
    textGlow: function(layer)
    {
        let thickness = 0.025 * layer;
        if (thickness < 0) thickness = .4
        layer = layer.abs()
        const t = [Math.max(0, Math.min(0.7, thickness)), Math.max(0, Math.min(0.7, thickness / 2)),
            Math.max(0, Math.min(0.7, Math.max(0, thickness - 0.3) / 4))];
        var color = this.textColor(layer)
        return "0px 0px " + t[0] + "em "+color+
            ",0px 0px " + t[1] + "em "+color+
            ",0px 0px " + t[2] + "em "+color;
    },
    layerFinder: function(layer) {
        layer = new Decimal(layer)
        document.getElementById("layernameoutput").style.color = this.textColor(layer)
        document.getElementById("layercoloroutput").style.color = this.textColor(layer)
        document.getElementById("layercoloroutput").innerHTML = this.textColor(layer)
        document.getElementById("layernameoutput").style.textShadow = this.textGlow(layer)
        document.getElementById("layerglowoutput").style.textShadow = this.textGlow(layer)
        document.getElementById("layerglowoutput").innerHTML = this.textGlow(layer)
        document.getElementById("layernameoutput").innerHTML = PrestigeLayer.getNameForLayer(layer)
    }
};
