<template>
    <div>
        <Poptip trigger="hover" placement="right" width="400">
            <p>{{address}}</p>
            <div class="api" slot="content">
                <baidu-map :ak="ak" v-on:ready="getAddress" ref="map" :scroll-wheel-zoom="true" class="bm-view map"  :center="center" :zoom="20">
                    <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
                        <bm-label content="参考位置" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
                    </bm-marker>
                </baidu-map>
            </div>
        </Poptip>

    </div>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import BaiduMap from 'vue-baidu-map';
    // {lng: 116.404, lat: 39.915}
    @Component({
        components:{

        }
    })
    export default class EquipLoc extends Vue{
        @Prop() position;
        ak = 'ufySmrMjKzItyY0cQ7CUFKGouuryXQLB';
        address:string = '';

        center={lng: this.position.lng, lat:this.position.lat };
            // {
            //     'lng':this.position.lng+0.1,
            //     'lat': this.position.lat+0.1,
            // }


        getAddress({BMap, map}){
            let geoc = new BMap.Geocoder();
            let _this=this;
            // this.center.lng = 120.404;
            // this.center.lat = 35.915;
            // this.center={lng: this.position.lng, lat: this.position.lat};
            geoc.getLocation(new BMap.Point(this.position.lng,this.position.lat), function(rs){
                _this.address = rs.address;
            })
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height: 300px;
    }
</style>
