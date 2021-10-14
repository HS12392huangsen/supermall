<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt="">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created | showDate}}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 这里导入utils.js文件，通过"common/utils.js"路径无法导入
  // import {formatDate} from "../../../common/utils.js";
  import {formatDate} from "@/common/utils.js";
  
  export default {
		name: "DetailCommentInfo",
    props: {
		  commentInfo: {
		    type: Object,
        default() {
		    	return {}
        }
      }
    },

    /*  
    关于从服务器返回的时间：都不是以2021-11-09来显示的，而是以Unix时间元年为起点，返回对应的时间戳，如1535694719(时间戳)
    问题:如何将时间戳  转成  时间格式化字符串(常用)
        时间戳: 1535694719(秒)
        1.将时间戳转成Date对象
          const date = new Date(1535694719 * 1000)
        2.将date进行格式化,转成对应的字符串
          date.getFullYear() : date.getMonth() + 1
          date -> FormatString(太常用)
          fmt.format(date, 'yyyy-MM-dd:hh:')
          y: year年
          M: Month月
          d:day日
          h:hours小时(h(12小时)/H(24小时))
    */
    // 这里在过滤器中通过utils中的正则表达式，对时间戳进行显示
    filters: {
      showDate: function (value) {
        // 1、将时间戳转成Date对象
        let date = new Date(value*1000);
        // 2、将date进行格式化
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
	}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .header-title {
    float: left;
    font-size: 15px;
  }

  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }

  .info-user {
    padding: 10px 0 5px;
  }

  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
  }

  .info-other .date {
    margin-right: 8px;
  }

  .info-imgs {
    margin-top: 10px;
  }

  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>
