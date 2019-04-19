<template>
    <div class="hello">

        <h1>{{ msg }}</h1>
        <div class="content-wrap">
            <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left"
                    title="Tooltip on lef">Tooltip on left
            </button>
            <button type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top"
                    title="Tooltip on top">Tooltip on top
            </button>
            <button type="button" class="btn btn-warning" data-toggle="tooltip" data-placement="bottom"
                    title="Tooltip on bottom">Tooltip on bottom
            </button>
            <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="right"
                    title="Tooltip on right">Tooltip on right
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Hello extends Vue {
        @Prop() private msg!: string;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
