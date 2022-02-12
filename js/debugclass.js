class DebugClass {
    constructor(name,desc,ver,buttons) {
        this.name = name
        this.desc = desc
        this.version = ver
        this.buttons = buttons
    }
    getButtons() {
        if (this.buttons === false) return ""
        let text = ""
        for (let i in this.buttons) {
            text += `<button onclick='` + this.buttons[i][1] + `'>` + this.buttons[i][0] + `</button> `
        }
        return text
    }
    getInfo() {
        return `<guide-item>
        <template v-slot:title>` + this.name + " " + this.version + `</template>
        <template v-slot:text>` + this.desc + `<br> ` + this.getButtons() + `
        </template>
        </guide-item>`
    }
}