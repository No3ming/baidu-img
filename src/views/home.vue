<template>
  <div class="layout">
    <div class="layout-header">
      <div class="search-box">
        <Input v-model="value" placeholder="输入搜索内容" style="width: 300px"/>
        <Button type="primary" shape="circle" @click="onSearch">Search</Button>
      </div>
    </div>
    <Scroll :on-reach-bottom="handleReachBottom" class="content" :height="height" :distance-to-edge="-40">
      <div v-for="(item, i) in list" :key="i" class="img-item" :style="{width: ((100 / item.height) * item.width) + 'px'}">
        <div class="img-box">
          <img :src="item.thumbURL" alt="" :style="{width: ((100 / item.height) * item.width) + 'px'}">
        </div>
        <input type="hidden" :value="item.objURL" class="img-input"/>
        <div class="copy-box">
          <Tooltip placement="top">
            <Icon type="ios-copy" @click.native="Copy(item.objURL)"/>
            <div slot="content">
              点击复制原图地址
            </div>
          </Tooltip>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'home',
    data () {
      return {
        value: '',
        list: [],
        height: window.innerHeight - 120,
        pn: 0,
        loop: 0
      }
    },
    methods: {
      async onGetData () {
        let word = this.value
        let pn = this.pn
        const data = await api.getData({word, pn})
        let list
        if (typeof data === 'string') {
          let newData = data.replace(/\\'/gi, '')
          list = JSON.parse(newData).data
        } else {
          list = data.imgs
        }
        let newList = []
        list.forEach((item, i) => {
          if (item.width > 1000 && item.height > 1000) {
            newList.push(item)
          }
        })
        return newList
      },
      Copy (str) {
        let save = (e) => {
          e.clipboardData.setData('text/plain', str)
          e.preventDefault()
        }
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
        console.log(str)
      },
      async onSearch () {
        this.pn = 0
        this.list = []
        this.loop = 0
        await this.loopImg()
      },
      async loopImg (cat) {
        this.pn += 60
        this.loop++
        let data = await this.onGetData()
        this.list = this.list.concat(data)
        if ((this.list.length < 100 || (this.loop < 100 && cat)) && this.loop < 5000) {
          await this.loopImg(cat)
        }
      },
      async handleReachBottom () {
        this.loop = 0
        await this.loopImg(true)
      }
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
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

  .img-item {
    position: relative;
    left: 0;
    top: 0;
    height: 100px;
    margin: 10px 1%;
    float: left;
    text-align: center;
  }
  .img-box {
    height: 100px;
    float: left;
    text-align: center;
  }

  .img-box img {
    display: block;
    height: 100%;
    object-fit: contain;
  }

  .copy-box {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 40px;
    cursor: pointer;
    opacity: .5;
  }
  .copy-box:hover {
    opacity: 1;
  }
</style>
