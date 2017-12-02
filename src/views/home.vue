<template>
  <div class="layout">
    <div class="layout-header">
      <div class="search-box">
        <Input v-model="value" placeholder="输入搜索内容" style="width: 300px"/>
        <Button type="primary" shape="circle"  @click="onSearch">Search</Button>
      </div>
    </div>
    <Scroll :on-reach-bottom="handleReachBottom" class="content" :height="height" :distance-to-edge="-40">
        <div v-for="(item, i) in list" :key="i" class="img-box">
          <img :src="item.middleURL" alt="">
        </div>
    </Scroll>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'home',
    data () {
      return {
        value: '',
        list: [],
        height: window.innerHeight - 120,
        pn: 0
      }
    },
    methods: {
      onGetData () {
        return new Promise((resolve, reject) => {
          let word = this.value
          let pn = this.pn
          axios.get('/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&cl=2&lm=-1&ie=utf-8&oe=utf-8&st=-1&z=&ic=0&word=' + word + '&face=0&istype=2&nc=1&pn=' + pn + '&rn=30')
            .then((res) => {
              let data
              if (typeof res.data === 'string') {
                let newData = res.data.replace(/\\'/gi, '')
                data = JSON.parse(newData).data
              } else {
                data = res.data.data
              }
              resolve(data)
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      async onSearch () {
        this.pn = 0
        this.list = await this.onGetData()
      },
      async handleReachBottom () {
        this.pn += 30
        let data = await this.onGetData()
        this.list = this.list.concat(data)
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
    height: 100%;
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
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }

  .search-box {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
  }

  .content {
    margin: 20px auto 30px;
    width: 100%;
    height: calc(100% - 110px);
    background-color: #fff;
  }
  .img-box {
    width: 23%;
    height: 200px;
    margin: 10px 1%;
    float: left;
    text-align: center;
  }
  .img-box img {
    height: 100%;
    object-fit: contain;
  }
</style>
