<template>
  <Header/>
  <div class="main">
    <!-- 主内容区域 -->
    <div class="main-content">
      <div class="main-title">
        <router-link :to="{name: 'home'}" style="color: #F8A276;">关注</router-link>
        <router-link :to="{name: 'login'}">推荐</router-link>
        <router-link :to="{name: 'home'}">热榜</router-link>
        <router-link :to="{name: 'home'}">失物招领</router-link>
        <router-link :to="{name: 'home'}">热点讨论</router-link>
        <router-link :to="{name: 'home'}">吐槽</router-link>
      </div>
      <div class="card" v-infinite-scroll="load" style="overflow: hiddle">
        <div class="item-wrap" v-for="(item, index) in contentList" :key="index">
          <div class="card-title">
            <div class="avatar">
              <router-link :to="{name: 'login'}">
                <el-avatar
                :size="55"
                :src="item.userAvatar"/>
              </router-link>
            </div>
            <!-- 头像左边内容 -->
            <div class="avatar-right">    
              <router-link :to="{name: 'login'}">
                <h2>{{ item.userName }}</h2>
              </router-link>
              <h3>{{ item.releaseTime }}</h3>
            </div>
          </div>
          <div class="card-main">
            <div class="text-container">
              {{ item.contentText }}
            </div>
            <ul class="image-container">
              <li v-for="(imageUrl, index) in item.imageUrls" :key="index">
                <el-image 
                  style="width: 130px; height: 130px"
                  :src="imageUrl"
                  :zoom-rate="1.2"
                  :preview-src-list="item.imageUrls"
                  :initial-index="index"
                  fit="cover"
                  lazy
                />
              </li>
            </ul>
          </div>
          <div class="card-footer">
            
          </div>
        </div>
      </div>
      
    </div>
    <!--  主区域侧边栏  -->
    <div class="main-aside">
      <div class="hot-list">
        <div class="card-title">
          <span><el-icon><Opportunity /></el-icon></span>
          <span>热门榜单</span>
        </div>
        <ul class="hot-content">
          <router-link :to="{ 
                name: 'home', 
                query: {
                  id: item.id
                }
              }" v-for="(item, index) in hotList" :key="index">
            <li>
              <span style="font-weight: bold;" v-if="index < 3"> {{ index + 1 }} </span>
              <span style="color: #000; margin-right: 4px;" v-else-if="index == 9"> {{ index + 1 }} </span>
              <span style="color: #000;" v-else> {{ index + 1 }} </span>
              <el-text style="font-size: 1rem" truncated>{{ item.text }}</el-text>
            </li>
          </router-link>
        </ul>
      </div>
      <div class="author-recommendation">
        <div class="card-title">
          <span><el-icon><UserFilled /></el-icon></span>
          <span>作者推荐</span>
        </div>
          <ul class="author-content">
            <!-- 作者主页 -->
            <li v-for="(author, index) in authors" :key="index">
              <router-link :to="{ name: 'home' }">
                <div class="author-info">
                  <div class="author-avt"> 
                    <el-avatar style="margin-right: 10px;" :size="40" :src="author.avatarUrl" />
                  </div>
                  <!-- 作者介绍 -->
                  <div class="author-introduce">
                    <h2 style="line-height: 1.5rem;"> {{ author.authorName }}</h2>
                    <!-- 简介 -->
                    <div style="width: 180px;">
                      <el-text style="font-size: 13.5px;" truncated> {{ author.introduction }} </el-text>
                    </div>
                  </div>
                </div>
              </router-link>
              <el-button type="" link >
                <span><Plus style="width: 1em; height: 1em; margin-right: 3px"/>关注</span>
              </el-button>
            </li>
        </ul>
      </div>
      <Footer/>
    </div>
    <el-backtop 
      style="
        height: 60px;
        width: 60px;
        color: #F8A276;" 
      :right="120" :bottom="100">
      <el-icon><ArrowUpBold /></el-icon>
    </el-backtop>
  </div>
</template>

<script>

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { onMounted, reactive } from 'vue';
import { getContentList, getHotList, getAuthorRecommendation } from '@/data/home.js'
export default {
  name: 'home',
  components: {
    Header,
    Footer,
  },
  setup() {
    const state = reactive({
      contentList: getContentList(),
      hotList: getHotList(),
      authors: getAuthorRecommendation(),
    })
    const load = () => {
      console.log('---进入');
      state.contentList.push(...getContentList())
      console.log(state.contentList);
    }

    return {
      ...state,
      load,
    }
  }
}
</script>

<style scoped>
  .main {
    width: 1088px;
    margin: auto;
    padding: 0 16px;
    margin-top: 8px;
    display: flex;
  }
  .main-title {
    display: flex;
    height: 58px;
    align-items: center;
    border-bottom: 1px solid #e3e4e6;
  }
  .main-title a{
    display: flex;
    font-size: 17px;
    color: #000;
    margin: 0 22px
  }
  .main-content {
    width: 750px;
    margin-right: 15px;
    background-color: #fff;
  }

  /* ================= card ================== */
  .item-wrap {
    padding: 20px;
    border-bottom: 1px solid #e3e4e6;
  }

  /* 头部 */
  .card-title {
    display: flex;
    align-items: center;
  }
  /* 头像左边容器 */
  .avatar-right {
    margin-left: 15px;
  }
  .avatar-right a {
    color: #000;
  }
  .avatar-right {
    padding-top: 15px;  
  }
  .avatar-right h2, h3{
    line-height: 1.5;
  }


  /* 内容 */
  .card-main {
    margin: 10px 0;
  }
  .text-container {
    margin-bottom: 15px;
    font-size: 1.3rem;
    color: #3e3e3e;
  }

  /* 图片容器 */
  .image-container {
    width: 420px;
  }
  .image-container li{
    display: inline;
    margin-right: 7px;
  }
  .main-aside {
    width: 296px;
  }

  /* =================== 侧边栏 =================== */
  .hot-list, .author-recommendation{
    background-color: #FFF;
    padding: 0px 10px;
    margin-bottom: 20px;
  }
  .main-aside .card-title {
    padding: 15px 0;
    font-size: 1.1rem;
    border-bottom: 1px solid #e3e4e6;
    display: flex;
    align-items: center;
    /* color: #F8A276; */
  }
  .card-title span {
    margin-right: 8px;
  }
  .hot-list .hot-content span:first-child {
    margin-right: 12px;
    color: #F8A276;
  }
  .hot-content li{
    padding: 8px 0;
    display: flex;
  }

  /* ==================== 推荐作者 ================== */
  .author-info {
    display: flex;
    align-items: center;
  }
  .follow-btn {
    float: right;

  }
  .author-content li {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .author-content a {
    color: #3e3e3e;
  }
  .main-aside li:hover {
    background-color: rgb(247,248,250);
  }
  /* .author-recommendation  */

</style>
