Vue.component("debug-tab", {
    template: `<div class="guide-tab">
    <guide-item>
    <template v-slot:title>All buttons</template>
    <template v-slot:text>All buttons from debug menu items<br>` + function() {
        let text = ""
        for (v in mod.debugClasses) {
            text += v.getButtons()
        }
        return text + `
    </template>
    </guide-item>
    ` + function() {
        let text = ""
        for (v in mod.debugClasses) {
            text += v.getInfo()
            text += "\n"
        }
        return text
    } + `
</div>`
})
