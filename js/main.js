let dtOld = Date.now();
let dtNew = Date.now();
let minimizedLayer = 0;
let saveTimer = 0;
let localTimer = 0;

let keyMap = [];
let tabMap = {};
let textBoxFocused = false;

const app = new Vue({
    el: "#app",
    data: game,
    methods: functions,
    computed: computed,
    created: onCreate
});

function onCreate()
{
    const loadingText =  document.querySelector("#loading > p");

    loadingText.innerHTML = "Initializing...";
    functions.generateLayer(0);
    functions.setCurrentLayer(game.layers[0]);
    loadingText.innerHTML = "Loading Savegame...";
    functions.loadGame();

    document.getElementById("loading").style.opacity = "0";

    requestAnimationFrame(update);
}

function tickGame(seconds)
{
    game.timeSpent += seconds;
    saveTimer += seconds;
    localTimer += seconds;
    
    let titleInfo = "";
    switch(game.settings.titleStyle)
    {
        case 0:
            break;
        case 1:
            titleInfo = Utils.getMOTD();
            break;
        case 2:
            titleInfo = "Layer "
            titleInfo += game.metaLayer.active ? functions.formatNumber(game.metaLayer.layer.add(1), 3, 0) : new Decimal(1).add(game.highestLayer);
            break;
    }
    document.title = "ωEngine" + (game.settings.titleStyle !== 0 ? ":" : "") + " " + titleInfo;

    if(saveTimer > 30)
    {
        functions.saveGame();
        saveTimer = 0;
    }

    if(game.layers[game.layers.length - 1].canGenerateNextLayer())
    {
        functions.generateLayer(game.layers.length);
    }

    if(game.currentChallenge && game.currentChallenge.isCompleted())
    {
        game.currentChallenge.succeed();
    }

    if(keyPressed("m"))
    {
        if(game.settings.tab === "Layers" && game.metaLayer.active)
        {
            game.metaLayer.maxAll();
        }
        if(game.settings.tab === "Aleph")
        {
            game.alephLayer.maxAll();
        }
        else
        {
            game.currentLayer.maxAll();
        }
    }

    game.highestLayer = Decimal.max(new Decimal(game.highestLayer), game.layers.length - 1);
    game.highestLayer = Decimal.max(new Decimal(game.highestLayer), game.metaLayer.layer);
    game.highestUpdatedLayer = Decimal.max(new Decimal(game.highestUpdatedLayer), game.layers.length - 1);
    game.highestUpdatedLayer = Decimal.max(new Decimal(game.highestUpdatedLayer), game.metaLayer.layer);

    const minActiveLayer = game.settings.showMinLayers;
    const maxActiveLayer = game.layers.length - game.settings.showMaxLayers;

    //find out how many layers are minimized and active
    const numActiveLayers = game.settings.showMinLayers + game.settings.showMaxLayers + (game.currentLayer.layer >= game.settings.showMinLayers && game.currentLayer.layer < game.layers.length - game.settings.showMaxLayers ? 1 : 0);
    const numMinimizedLayers = game.layers.length - numActiveLayers;

    if(numActiveLayers < game.layers.length && numActiveLayers > 0)
    {
        //if the layer is active, tick every frame
        for(let i = 0; i < game.layers.length; i++)
        {
            if(i < minActiveLayer || i >= maxActiveLayer || game.layers[i] === game.currentLayer)
            {
                game.layers[i].tick(seconds);
            }
        }
        //increase and wrap the minimized layer
        //to increase performance, inactive layers only tick one at a time
        const layersAtOnce = game.settings.layerTickSpeed;
        for(let i = 0; i < layersAtOnce; i++)
        {
            minimizedLayer = (minimizedLayer + 1) % game.layers.length;
            while(minimizedLayer < minActiveLayer || minimizedLayer >= maxActiveLayer || game.layers[minimizedLayer] === game.currentLayer)
            {
                minimizedLayer = (minimizedLayer + 1) % game.layers.length;
            }
            //otherwise, tick with less resolution
            game.layers[minimizedLayer].tick(seconds * numMinimizedLayers / layersAtOnce);
        }
    }
    else
    {
        for(const l of game.layers)
        {
            l.tick(seconds);
        }
    }
    game.alephLayer.tick(seconds);

    for(const k of Object.keys(game.automators))
    {
        game.automators[k].tick(seconds);
    }

    for(const ach of game.achievements)
    {
        ach.tick(seconds);
    }
    for(const sAch of game.secretAchievements)
    {
        sAch.tick(seconds);
    }

    for(const n of game.notifications)
    {
        n.tick(seconds);
        if(n.lifeTime > 5)
        {
            game.notifications = game.notifications.filter(notification => notification !== n);
        }
    }

    game.restackLayer.tick(seconds);
    game.metaLayer.tick(seconds);
}

function simulateGameTime(seconds)
{
    let times = 100;
    let timePerTick = seconds / 100;
    if(timePerTick < 0.01)
    {
        times = Math.floor(times / (0.01 / timePerTick));
        timePerTick = 0.01;
    }
    for(let i = 0; i < times; i++)
    {
        tickGame(timePerTick);
    }
}

function update()
{
    dtNew = Date.now();
    const dt = Math.max(0, (dtNew - dtOld) / 1000);
    dtOld = Date.now();

    tickGame(dt);

    requestAnimationFrame(update);
}

function keyPressed(k)
{
    return keyMap.includes(k);
}

onkeydown = e =>
{
    if(!keyMap.includes(e.key))
    {
        keyMap.push(e.key);
    }
    const lc = e.key.toLowerCase();

    if(textBoxFocused)
    {
        return;
    }
    if(!game.metaLayer.active)
    {
        if(e.key === "ArrowRight")
        {
            functions.setNextLayer();
        }
        if(e.key === "ArrowLeft")
        {
            functions.setPreviousLayer();
        }
        if(lc === "p")
        {
            if(!game.currentLayer.isNonVolatile() && game.currentLayer.canPrestige())
            {
                game.currentLayer.prestige();
            }
        }
        for(const tab of ["Layers", "Guide", "Settings"])
        {
            if(lc === tab[0].toLowerCase() && !e.ctrlKey)
            {
                game.settings.tab = tab;
            }
        }
        if(lc === "t" && !e.ctrlKey && game.alephLayer.isUnlocked())
        {
            game.settings.tab = "Aleph";
        }
        if(lc === "v" && !e.ctrlKey && game.highestLayer >= 2)
        {
            game.settings.tab = "Volatility";
        }
        if(lc === "c" && !e.ctrlKey)
        {
            game.settings.tab = "Achievements";
        }
        if(lc === "u" && !e.ctrlKey && game.highestLayer >= 1)
        {
            game.settings.tab = "Automators";
        }
    }
    else
    {
        if(lc === "l")
        {
            game.settings.tab = "Layers";
        }
    }

    if(lc === "r" && !e.ctrlKey && game.restackLayer.isUnlocked())
    {
        game.settings.tab = "ReStack";
    }
}

onkeyup = e =>
{
    keyMap = keyMap.filter(key => key !== e.key);
}

onbeforeunload = e => functions.saveGame();
