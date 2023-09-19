<template>
    <div class="header-box">
        <el-header class="header" >
            <el-row class="header-row">
                <el-col :span="2" class="logo-col">
                    <div class="logo">
                        <img :src="logo" alt="logo">
                    </div>
                </el-col>
                <el-col :span="9" class="tabs">
                    <ul>
                        <li>
                            <router-link :to="{name: 'home'}" style="border-bottom: 3.5px solid #F8A276;">
                                <HomeFilled style="width: 1em; height: 1em; margin-right: 5px;"/>
                                <span>首页</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'home'}">
                                <Stopwatch style="width: 1em; height: 1em; margin-right: 5px;"/>
                                <span>活动</span>
                            </router-link>                         
                        </li>
                        <li>
                            <router-link :to="{name: 'home'}">
                                <EditPen style="width: 1em; height: 1em; margin-right: 5px;"/>
                                <span>等你回答</span>
                            </router-link>   
                        </li>
                    </ul>
                </el-col>
                <el-col :span="7">
                    <div class="search">
                        <el-input 
                            v-model="keyword"
                            class="search-input"
                            placeholder="搜索"
                            :suffix-icon="Search"
                            size="large"/>
                    </div>
                </el-col>
                <el-col :span="6" class="info-container">
                    <div class="info">
                        <el-button color="#F8A276" round size="large" @click="toCreativeCenter">
                            <span><EditPen style="width: 1em; height: 1em; margin-right: 5px;"/>发表</span>
                        </el-button>
                        <template v-if="token">
                            <el-dropdown class="message-btn">
                                <span class="msg-btn">
                                    <BellFilled style="width: 2em; height: 2em; margin-top: 5px;"/>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>评论</el-dropdown-item>
                                        <el-dropdown-item>赞和收藏</el-dropdown-item>
                                        <el-dropdown-item>新增粉丝</el-dropdown-item>
                                        <el-dropdown-item>私信</el-dropdown-item>
                                        <el-dropdown-item>系统通知</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-dropdown trigger="click">
                                <div class="el-dropdown-link">
                                    <el-avatar style="margin-top: 5px;" :size="44" :src="circleUrl" />
                                </div>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :icon="Avatar">主页</el-dropdown-item>
                                    <el-dropdown-item :icon="Setting">设置</el-dropdown-item>
                                    <el-dropdown-item :icon="TurnOff">退出</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                        <template v-else>
                            <el-button color="#F8A276" round plain size="large" @click="toLogin"><span>登录</span></el-button>
                            <el-button color="#F8A276" round plain size="large" @click="toRegister"><span>注册</span></el-button>
                        </template>
                    </div>
                </el-col>
            </el-row>
        </el-header>
    </div>

</template>

<script>
import logo from "@/assets/images/logo.png";
import { Search, Setting, Avatar, TurnOff } from '@element-plus/icons-vue'
import { reactive, toRefs, } from "vue"
import { useRouter } from "vue-router";
export default {
    name: "Header",
    setup(props, context) {
        const router = useRouter();
        const state = reactive({
            keyword: "",
            token: "1",
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        })
        const toLogin = () => { router.push({ path: '/login' }) }
        const toRegister = () => { router.push({ path: '/register' }) }
        const toCreativeCenter = () => { router.push({ path: '/creativeCenter' }) }
        return {
            ...toRefs(state),
            logo,
            Search,
            Setting,
            Avatar,
            TurnOff,
            toLogin,
            toRegister,
            toCreativeCenter,
        }
    }
}
</script>
<style scoped>
    .header-box {
        border-bottom: 1px solid #f0f0f0;
        background-color: #ffffff;
    }
    .header {
        margin: auto;
        width: auto;
        max-width: 1300px;
        min-width: 1000px;
        display: flex;
        align-items: center; 
    }

    /* ========= logo ========== */
    .logo-col {
        display: flex;
        align-items: center;
    }

    /* ========= 菜单栏 ========== */
    .tabs ul {
        margin-left: 40px;
        height: 50px;
    }
    .tabs li {
        float: left;
        line-height: 60px;
        font-size: 20px;
        margin-right: 10px;
    }
    .tabs a {
        display: block;
        color: #333;
        padding: 0 10px; 
    }
    .tabs a:hover {
        background-color: #f0f0f0;
    }
    .tabs a:vis {
        color: #F8A276;
    }

    /* ========= search ========== */
    .search {
        margin-top: 10px;
        width: 300px;
    }
    /* ========= info ========== */
    .info-container {
        display: flex;
        align-items: center;
    }
    .info {
        display: flex;
        align-items: center;
    }
    .info .msg-btn {
        color: rgb(94, 93, 93);
        margin: 0px 30px;
    }

</style>