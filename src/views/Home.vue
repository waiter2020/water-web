<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu ref="menu" @on-select="setCurrentViewName" :active-name="viewName" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="home" to="/">
            <Icon type="ios-navigate"></Icon>
            <span>总览</span>
          </MenuItem>
          <MenuItem name="equip" to="equip">
            <Icon type="ios-analytics"></Icon>
            <span>设备</span>
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-paper"></Icon>
            <span>报表</span>
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-keypad"></Icon>
            <span>组织</span>
          </MenuItem>
        </Menu>
      </Sider>
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" >
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </MenuItem>
            <Dropdown @on-click="onUserMenuClick">
              <a href="javascript:void(0)" style="color: #97ebff">
                <Avatar icon="ios-person" />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem disabled>{{userName}}</DropdownItem>
                <DropdownItem>个人中心</DropdownItem>
                <DropdownItem name="logout" divided style="color: red" >退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      <Footer class="layout-footer-center">2018-2019 &copy; waiter</Footer>
    </Layout>
    </Layout>
  </div>
</template>
<script lang="ts">
  import {Component, Emit, Prop, Vue} from "vue-property-decorator";
  import Hello from '@/components/Hello.vue';
  import {Getter, Action, Mutation} from "vuex-class";

  @Component({
    components:{
      Hello,
    }
  })
  export default class Home extends Vue {
    @Mutation('saveToken') saveToken:Function;
    @Mutation('saveUserName') saveUserName:Function;

    isCollapsed: boolean = false;
    currentViewName:string|null = localStorage.getItem("currentViewName")?localStorage.getItem("currentViewName"):"home";

    data():Object{
      return {
       isCollapsed: false
     };
    }

    @Emit('computed')
    menuitemClasses():string[] {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }

    get userName(){
      return this.$store.getters.getUserName;
    }

    get viewName(){
      return this.currentViewName;
    }

    setCurrentViewName(name:string){
      this.currentViewName=name;

      localStorage.setItem("currentViewName",name);

      this.$nextTick(()=>{
        this.$refs.menu[`updateActiveName`].call();
      });
    }

    logout(){
      this.saveToken('');
      this.saveUserName('');
      this.$router.push('/login');
    }

    onUserMenuClick(name:string){
      switch (name) {
        case 'logout':
          this.logout();
          break;
      }
    }

  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }

  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .white-link{
    color: aliceblue;
  }
</style>
