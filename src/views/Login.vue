<template>
    <div class="center">
            <Card style="width:400px">
                <div  style="text-align:center">
                    <h3>登录</h3>
                    <Form ref="formInline" :model="formInline" :rules="ruleInline" >
                        <FormItem prop="username">
                            <Input type="text" v-model="formInline.username" placeholder="Username">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="passwd">
                            <Input type="password" v-model="formInline.passwd" placeholder="Password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"  @click="handleSubmit('formInline')">Signin</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>

    </div>

</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import { mapMutations } from 'vuex';
    import {Getter, Action, Mutation} from "vuex-class";
    import axios from '../axios';

    // import {login} from '@/stores/modules/user';


    @Component({
        components:{

        }
    })
    export default class Login extends Vue{
        @Action('getUserInfo') getUserInfo:Function;

        username:string = '';
        passwd:string = '';
        userToken:string = '';
        formInline= {
                'username':this.username,
                'passwd':this.passwd,
            };

        handleSubmit(name:string) {
            (this.$refs[name] as any).validate((valid:boolean) => {
                        if (valid) {
                            this.login();
                            console.log("成功")
                        } else {
                           console.log("失败")
                        }
                    })
        }

        login() {
            let _this = this;

            this.$store.dispatch('Login',this.formInline).then(res => {
                      //console.log(res.data);
                    _this.userToken =  res.data.token;
                    // 将用户token保存到vuex中
                    // _this.changeLogin({Authorization: _this.userToken});
                    _this.getUserInfo();
                    localStorage.setItem("currentViewName",'home');
                    _this.$router.push('/');
                    alert('登陆成功');
                }).catch(error => {
                    alert('账号或密码错误');
                    console.log(error);
                });


        }

        get ruleInline(){
            return {
                username: [
                    { required: true, message: '请填写用户名！', trigger: 'blur' },
                    { type: 'string', min: 6, message: '用户名长度不小于6位！', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '请填写密码！', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不小于6位！', trigger: 'blur' }
                ]}

        }
    }

</script>

<style scoped>
    .center {
        position: absolute;
                 top: 50%;
                 left: 50%;
                 -ms-transform: translate(-50%,-50%);
                 -moz-transform: translate(-50%,-50%);
                 -o-transform: translate(-50%,-50%);
                 transform: translate(-50%,-50%);
    }
</style>
