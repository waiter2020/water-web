<template>
    <Tabs value="name1">
        <TabPane label="设备列表" name="name1">
            <EquipList></EquipList>
        </TabPane>
        <TabPane label="用水数据" name="name2">标签二的内容
            <!--<EquipLoc :position="position"></EquipLoc>-->
        </TabPane>
        <TabPane label="设备日志" name="name3">标签三的内容

        </TabPane>
    </Tabs>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import EquipList from '@/components/EquipList.vue';
    import EquipLoc from '@/components/EquipLoc.vue';

    @Component({
        components:{
            EquipList,EquipLoc,
        }
    })
    export default class Equips extends Vue {
            get position(){
                return [121.5273285, 31.21515044];
            }
    }
</script>

<style scoped>

</style>
