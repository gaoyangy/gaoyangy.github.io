<template>
  <el-row class="content">
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark nav-light-blue">
      <<router-link to="/test">test</router-link>
       <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      </div>
    </el-col>
  </el-row>
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-button type="primary" icon="edit" @click='addTodos'></el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <template v-if="!find_doing">
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status == false">
                  <span class="item">
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="update(index,'done')">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
                  </span>
                </div>
              </template> 
            </template>
            <div v-else-if="find_doing">
              暂无待办事项
            </div>
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <template v-if="!find_done">
            <template v-for="(item, index) in listDone">
              <div class="todo-list">
                <span class="item finished">
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="update(index,'doing')">还原</el-button>
                </span>
              </div>
            </template> 
          </template>
          <div v-else>
            暂无已完成事项
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>

import jwt from 'jsonwebtoken'

export default {

  created(){
    const userInfo = this.getUserInfo();
    if(userInfo != null){
      this.id = userInfo.id;
      this.name = userInfo.name;
    }else{
      this.id = '';
      this.name = ''
    }
    this.getTodolist();
  },

  data () {
    return {
      name: '',
      todos: '',
      activeName: 'first',
      list:[],
      find_doing:false,
      find_done:false,
      listDone:[],
      id: ''
    };
  },
  computed: {

  },

  methods: {
    addTodos() {
      if(this.todos == ''){
          this.$message({
              type: 'warning',
              message: '请输入有效内容！'
            })
            return;
      }
      let obj = {
        status: false,
        content: this.todos,
        id: this.id
      }
      this.$http.post('/api/todolist', obj)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '创建成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('创建失败！')
          }
        }, (err) => {
          this.$message.error('创建失败！')
          console.log(err)
        })
      this.todos = '';
    },
    update(index,status) {
      let url;
      if(status=='done'){
          url='/api/todolist/'+ this.id + '/' + this.list[index].id + '/' + this.list[index].status;
      }
      if(status=='doing'){
          url='/api/todolist/'+ this.id + '/' + this.listDone[index].id + '/' + this.listDone[index].status;
      }
      this.$http.put(url).then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务状态更新成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('任务状态更新失败！')
          }
        }, (err) => {
          this.$message.error('任务状态更新失败！')
          console.log(err)
        })
    },
    remove(index) {
      this.$http.delete('/api/todolist/'+ this.id + '/' + this.list[index].id)
        .then((res) => {
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '任务删除成功！'
            })
            this.getTodolist();
          }else{
            this.$message.error('任务删除失败！')
          }
        }, (err) => {
          this.$message.error('任务删除失败！')
          console.log(err)
        })
    },
    getUserInfo(){
      const token = sessionStorage.getItem('demo-token');
      if(token != null && token != 'null'){
        let decode = jwt.verify(token,'vue-koa-demo');
        return decode
      }else {
        return null
      }
    },
    getdonelist(list){
      this.listDone=[];
      this.list=[];
      for(let i=0;i<list.length;i++){
        if(list[i].status){
          this.listDone.push(list[i]);
        }
        if(!list[i].status){
          this.list.push(list[i]);
        }
      }
    },
    getTodolist(){
      this.$http.get('/api/todolist/' + this.id)
        .then((res) => {
          if(res.status == 200){
            this.getdonelist(res.data);
          }else{
            this.$message.error('获取列表失败！')
          }
        }, (err) => {
          this.$message.error('获取列表失败！')
          console.log(err)
        })
    }
  }
};
</script>

<style lang="stylus" scoped>
  .el-input
    margin 20px auto
  .todo-list
    width 100%
    margin-top 8px
    padding-bottom 8px
    border-bottom 1px solid #eee
    overflow hidden
    text-align left
    .item
      font-size 20px
      &.finished
        text-decoration line-through
        color #ddd
  .pull-right
    float right
  .nav-light-blue
    background:#58B7FF
    min-height:45px
    line-height:45px
</style>