<template>
    <Dropdown>
        <a href="javascript:void(0)">
            操作
            <Icon type="arrow-down-b"></Icon>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item name="update">数据上传</Dropdown-item>
            <Dropdown-item name="close">禁止用水</Dropdown-item>
            <Dropdown-item name="restart">重启</Dropdown-item>
            <Dropdown-item name="change">修改参数</Dropdown-item>
            <Dropdown-item style="color: red">解除绑定</Dropdown-item>
        </Dropdown-menu>
    </Dropdown>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    export default class EquipAction extends Vue{

    }
</script>

<style scoped>

</style>
