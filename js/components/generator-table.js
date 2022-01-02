Vue.component("generator-table",{
    props: ["generators"],
    template: `<table class="generator-table">
    <thead>
        <th>Generator</th>
        <th>Amount</th>
        <th>Buy</th>
        <th>Buy 10</th>
    </thead>
    <generator v-for="(g, i) in generators" :key="i" :generator="g"></generator>
</table>`
});