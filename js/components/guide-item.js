Vue.component("guide-item", {
    data: function()
    {
        return {
            expanded: false
        }
    },
    template: `<div class="guide-item">
    <div class="header" @click="expanded = !expanded">
        <h2><slot name="title"></slot></h2>
        <span v-if="!expanded">+</span>
        <span v-else>-</span>
    </div>
    <transition name="expandable">
        <div class="body" v-if="expanded">
            <slot v-if="expanded" name="text"></slot>
        </div>
    </transition>
</div>`
})