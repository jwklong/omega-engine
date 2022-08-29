Vue.component("debug-tab", {
    data: function() {
        return {
            debugClasses: mod.debugClasses
        }
    },
    template: `<div class="guide-tab">
    <guide-item>
    <template v-slot:title>All buttons</template>
    <template v-slot:text>All buttons from debug menu items<br>
    <span v-for="debugClass in debugClasses">
        {{debugClass.getButtons()}}
    </span>
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
