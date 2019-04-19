
<template>
    <div>
        <br/>
        <Table  :loading="loading"  :row-class-name="rowClassName" stripe :columns="columns" :data="equipInfos"></Table>
            <Layout>
                <Footer>
                    <Button style="float: right" type="info">添加设备</Button>
                    <Page @on-page-size-change="changePageSize" @on-change="changePage" :total="equips.getTotal()" placement="top" :page-size="pageSize" show-elevator show-sizer  />
                </Footer>
            </Layout>
    </div>
</template>
<script lang="ts">
    import {Component,Vue} from 'vue-property-decorator';
    import iView from 'iview'
    import {getAllEquip} from  '@/api/equip'
    import EquipLoc from '@/components/EquipLoc.vue';
    import EquipAction from '@/components/EquipAction.vue';

    @Component({
        components:{
            EquipLoc,EquipAction,
        }
    })
    export default class EquipList extends Vue {
        equips:EquipPage = new EquipPage();
        load:boolean = true;
        currentPage:Number = 1;
        pageSize:Number = 10;


        rowClassName (row, index) {

            if (index === 1) {
                return ' demo-table-info-row ';
            } else if (index === 3) {
                return ' demo-table-error-row ';
            }
            return '';
        }

               get columns(){
                return [
                       {
                           title: '编号',
                           key: 'equipId',
                           tooltip: true,
                           align: 'center',
                           sortable: true,
                       },
                       {
                           title: '名称',
                           key: 'name',
                           tooltip: true,
                           minWidth: 60,
                           align: 'center',
                       },
                    {
                        title: '位置',
                        align: 'center',
                        key: 'loc',
                        tooltip: true,
                        minWidth: 40,
                        render: (h, params) => {
                            return h(EquipLoc, {
                                    props: {
                                        'position':params.row.loc,
                                    },
                                }
                            );
                        }
                    }
                    ,
                    {
                        title: '总用水量（升）',
                        key: 'waterUsage',
                        tooltip: true,
                        align: 'center',
                        sortable: true,
                        sortMethod: EquipList.sortWaterUse,
                    },
                    {
                        title: '状态',
                        key: 'equipState',
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '检漏模式',
                        key: 'model',
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '阈值类型',
                        key: 'thresholdType',
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '阈值大小',
                        key: 'thresholdValue',
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '电量',
                        key: 'lowQuantityOfElectricity',
                        tooltip: true,
                        align: 'center',
                    },
                    {
                        title: '操作',
                        key: 'op',
                        align: 'center',
                        minWidth: 60,
                        render: (h, params) => {
                            return h(EquipAction, {
                                    props: {

                                    },
                                }
                            );
                        }
                    }
                   ];
        }

        get loading(){
            return this.load;
        }


        get equipInfos(){

            return this.equips.getEquipInfos(this.currentPage,this.pageSize);;
        }


        beforeMount(){
            let _this = this;
            this.$Loading.start();
            getAllEquip().then(res=>{
                _this.equips.equips=res.data;
                for (let equip of _this.equips.equips){
                    equip= EquipList.convertEquipState(equip);
                    equip=EquipList.convertEquipInfo(equip);
                }
                _this.load=false;
                _this.$Loading.finish();
            });
        }

        static convertEquipState(equip:object){
            if (equip['online']){
                if(!equip['open']&&equip['equipState']!=1&&equip['equipState']!=2&&equip['lock']){
                    equip['equipState']="禁止用水";
                }else if (!equip['open']&&equip['equipState']!=1&&equip['equipState']!=2){
                    equip['equipState']="阀门关闭";
                }else {
                    switch (equip['equipState']){
                        case 0:
                            equip['equipState']="正常";
                            break;
                        case 1:
                            if (equip['model']<2) {
                                equip['equipState']="小漏失";
                            }else {
                                equip['equipState']="正常";
                            }
                            break;
                        case 2:
                            if (equip['model']==0||equip['model']==2) {
                                equip['equipState']="大漏失";
                            }else {
                                equip['equipState']="正常";
                            }
                            break;
                        case 5:
                            equip['equipState']="正常";
                            break;
                        default:
                            equip['equipState']="正常";

                            break;

                    }
                }
            }else {
                equip['equipState']="离线";
            }
            return equip;
        }


        static convertEquipInfo(equip:object){
            equip['lowQuantityOfElectricity']=equip['lowQuantityOfElectricity']?'低电量':'正常';
            equip['loc']= {

                'lng': equip['locLongitude']
                ,

                'lat': equip['locLatitude']
                ,
            };

            equip['waterUsage'] = equip['waterUsage'].toString().substr(0,equip['waterUsage'].toString().indexOf('.')+2);

            equip['thresholdValue'] = equip['thresholdType']==1?equip['thresholdValue']+'S':equip['thresholdValue']+'L';

            equip['thresholdType'] = equip['thresholdType']==1?'时间':'流量';

            equip['model'] = this.convertModel(equip['model']);

            return equip;
        }

        static convertModel(model:Number):string{
            switch (model) {
                case 0:
                    return '大漏失、小漏失都检测';
                case 1:
                    return '只检测小漏失';
                case 2:
                    return '只检测大漏失';
                case 3:
                    return '大小漏失都不检测';
            }
            return "未知"
        }

        changePage(page:Number){
            this.currentPage=page;
        }

        changePageSize(pageSize:Number){
            this.pageSize=pageSize;
        }

        static sortWaterUse(a:Number, b:Number, type:string):Number{
            if (type==='asc'){
                return +a-+b;
            } else {
                return +b-+a;
            }
        }

    }

    class EquipPage{
        equips:Array<object> = [];
        getEquipInfos(page:Number,size:Number){
            return this.equips.slice(+(+page-1)*+size,+page*+size);
        }

        getTotal():Number{
            return this.equips.length>0 ? this.equips.length:0;
        }

    }
</script>


<style scoped>
    .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
</style>
