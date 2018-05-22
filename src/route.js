/**
 * Created by chenzhongying on 2018/5/8.
 */

Vue.use(VueRouter);
console.log($);
const Foo = { template:'<div>foo</div>'};
const Bar = {template:'<div>bar</div>'};
const User = {
    template: '<div>User{{$route.params}}</div>'
};
const routes =[
    {path:'/foo',component:Foo},
    {path:'/bar',component:Bar},
    {path:'/user/:id/post/:post_id',component:User}
];
const router = new VueRouter({
    routes
});
const app = new Vue({
    router
}).$mount('#app');