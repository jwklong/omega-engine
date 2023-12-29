Vue.component("settings-menu", {
    data: function ()
    {
        return {
            settings: game.settings,
            exportString: "The exported Save String will appear here. Keep it somewhere safe." +
                " Click Import to load the save string from the text field.",
            themes: mod.themes,
            names: mod.layerNames,
            fonts: mod.fonts,
            saves: mod.saves
        }
    },
    mounted: function()
    {
        this.$refs.exportBox.onfocus = e => textBoxFocused = true;
        this.$refs.exportBox.onblur = e => textBoxFocused = false;
    },
    beforeDestroy: function()
    {
        this.$refs.exportBox.onfocus = null;
        this.$refs.exportBox.onblur = null;
    },
    methods: {
        save: () => functions.saveGame(),
        clear: function()
        {
            this.exportString = "";
        },
        download: function()
        {
            this.exportGame();

            const date = new Date();
            const dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(d => d.toString().padStart(2, "0")).join("-") + "-" +
                [date.getHours(), date.getMinutes(), date.getSeconds()].map(d => d.toString().padStart(2, "0")).join("");

            let a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = "data:application/octet-stream;charset=utf-8," + this.exportString;
            a.download = mod.primaryName+mod.secondaryName+dateString+".txt";
            a.click();
            document.body.removeChild(a);
        },
        paste: function()
        {
            navigator.permissions.query({name: "clipboard-read"}).then(result =>
            {
                if(result.state === "granted" || result.state === "prompt")
                {
                    navigator.clipboard.readText().then(text =>
                    {
                        this.exportString = text;
                    })
                }
            });
        },
        copy: function()
        {
            navigator.permissions.query({name: "clipboard-write"}).then(result =>
            {
                if(result.state === "granted" || result.state === "prompt")
                {
                    navigator.clipboard.writeText(this.exportString).then(function()
                    {
                        functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "Copied to Clipboard", "images/save.svg"));
                    })
                }
            });
        },
        exportGame: function()
        {
            this.exportString = functions.getSaveString();
        },
        importGame: function()
        {
            const ret = functions.loadGame(this.exportString);
            if(game.settings.notifications)
            {
                if(!ret)
                {
                    functions.createNotification(new Notification(NOTIFICATION_ERROR, "Error occured while importing...", "images/save.svg"));
                }
                else if(ret === -1)
                {
                    functions.createNotification(new Notification(NOTIFICATION_ERROR, "CoNfUsIoN"));
                }
                else
                {
                    functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "Game imported!", "images/save.svg"));
                }
            }
            game.settings.tab = "Layers";
        },
        hardResetGame: () => functions.hardResetGame(),
        setTheme: css => functions.setTheme(css),
        setNames: js => functions.setNames(js),
        setFont: css => functions.setFont(css),
        setSave: info => functions.setSave(info),
        volatilityUnlocked: () => functions.maxLayerUnlocked() >= 2
    },
    template: `<div class="settings">
<div class="settings-panel-container">
    <div class="settings-panel">
        <label>Show all Layers <input type="checkbox" v-model="settings.showAllLayers"/></label>
        <label>Show Layer Ordinals (&alpha;: #1, &beta;: #2, ...) <input type="checkbox" v-model="settings.showLayerOrdinals"/></label>
    </div>
    <div class="settings-panel">
        <label>Show first <input :disabled="settings.showAllLayers" type="number" min="1" max="5" v-model.number="settings.showMinLayers"/> Layers</label>
        <label>Show last <input :disabled="settings.showAllLayers" type="number" min="1" max="5" v-model.number="settings.showMaxLayers"/> Layers</label>
    </div>
    <div class="settings-panel">
        <label>Buy Max always buys until 10 <input type="checkbox" v-model="settings.buyMaxAlways10"/></label>
        <label>Disable Buy Max on highest unlocked Layer <input type="checkbox" v-model="settings.disableBuyMaxOnHighestLayer"/></label>
        <label v-if="volatilityUnlocked()">Auto Max All <input type="checkbox" v-model="settings.autoMaxAll"/></label>
        <label>Auto Prestige Highest Layer <input type="checkbox" v-model="settings.autoPrestigeHighestLayer"/></label>
    </div>
    <div class="settings-panel">
        <label>Allow Resource Colors <input type="checkbox" v-model="settings.resourceColors"/></label>
        <label>Allow Resource Glow <input type="checkbox" v-model="settings.resourceGlow"/></label>
        <label>News Ticker <input type="checkbox" v-model="settings.newsTicker"/></label>
        <label>Notifications <input type="checkbox" v-model="settings.notifications"/></label>
        <label>Save Notifications <input type="checkbox" v-model="settings.saveNotifications"/></label>
        <label>Confirmations <input type="checkbox" v-model="settings.confirmations"/></label>
    </div>
    <div class="settings-panel">
        <span>Title Style</span><br/>
        <fieldset>
            <label><input type="radio" value="0" v-model.number="settings.titleStyle"/> None</label><br/>
            <label><input type="radio" value="1" v-model.number="settings.titleStyle"/> Motd</label><br/>
            <label><input type="radio" value="2" v-model.number="settings.titleStyle"/> Current Layer</label>
        </fieldset>
    </div>
    <div class="settings-panel">
        <label>Offline Progress <input type="checkbox" v-model="settings.offlineProgress"/><br/>(increases loading time)</label>
    </div>
</div>
<div class="settings-row">
    <label>Theme <button :class="{selected: settings.theme === t[1]}" v-for="t in themes" @click="setTheme(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <label>Layer Names <button :class="{selected: settings.layerNames === t[1]}" v-for="t in names" @click="setNames(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <label>Fonts <button :class="{selected: settings.font === t[1]}" v-for="t in fonts" @click="setFont(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <button @click="save()">Save Game</button>
    <button @click="exportGame()">Export</button>
    <button @click="importGame()">Import</button>
    <button @click="hardResetGame()">Wipe Game</button>
</div>
<div class="settings-row">
    <button :class="{selected: settings.saveInfo === t[1]}" v-for="t in saves" @click="setSave(t[1])">{{t[0]}}</button>
</div>
<div class="settings-row">
    <textarea ref="exportBox" class="export" v-model="exportString"></textarea>
</div>
<div class="settings-row">
    <button @click="copy()">Copy to Clipboard</button>
    <button @click="paste()">Paste from Clipboard</button>
    <button @click="clear()">Clear</button>
    <button @click="download()">Download as .txt</button>
</div>
<div class="settings-row">
    <p>Controls: M to Max All on the selected Layer<br/>
    Left and Right Arrows to change Layers<br/>
    P to Prestige the selected Layer<br/>
    First Letter of a tab ([L]ayers, [S]ettings) to select it; C to select Achievements</p>
</div>
<div class="credits">
    <h2>Layer Info Finder</h2><br>
    <h3>Layer ID:</h3>
    <input type="input" value="0" id="layerID">
    <button onclick="functions.layerFinder(document.getElementById('layerID').value)">Get Layer Info</button><br>
    <h3>Output:</h3><br>
    <h4>Layer: <a id="layernameoutput"></a></h4><br>
    <h5>Hex Color: <a id="layercoloroutput"></a></h5><br>
    <h5>Glow Info: <a id="layerglowoutput"></a></h5>
</div>
<div class="credits">
    <h4>Credits</h4>
    <p>Inspiration: Antimatter Dimensions by hevipelle, Infinite Layers by dan-simon</p>
    <p>Original Game (Omega Layers) created by VeproGames</p>
    <p>Powered by vue.js and break_eternity.min.js</p>
    <p>${mod.primaryName + mod.secondaryName} v${mod.primaryName + mod.secondaryName === "ωEngine" ? mod.engineVer : mod.version}</p>
    <p>${mod.primaryName + mod.secondaryName !== "ωEngine" ? "Made with ωEngine v" + mod.engineVer : ""}</p>
</div>
</div>`
})
