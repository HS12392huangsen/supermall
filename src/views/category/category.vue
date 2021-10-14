// category类别、种类，在category.vue分类页面组件中演示BetterScroll
// 具体可以到https://better-scroll.github.io/docs/zh-CN/guide/
// 可以通过https://github.com/ustbhuangyi/better-scroll————tags————dist————bscroll.min.js，下载相关引用包
// 可以通过npm install @better-scroll/core@next --save下载
// npm install better-scroll@1.13.2 --save视频中对应的版本
<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <!--1.无论是否设置click:false, button都可以点击-->
    <button @click="btnClick">按钮</button>

    <!--2.必须设置click:true, 那么div才能监听点击-->
    <div @click="divClick">呵呵呵呵</div>

    <ul class="content">
      <li>分类列表1</li>
      <li>分类列表2</li>
      <li>分类列表3</li>
      <li>分类列表4</li>
      <li>分类列表5</li>
      <li>分类列表6</li>
      <li>分类列表7</li>
      <li>分类列表8</li>
      <li>分类列表9</li>
      <li>分类列表10</li>
      <li>分类列表11</li>
      <li>分类列表12</li>
      <li>分类列表13</li>
      <li>分类列表14</li>
      <li>分类列表15</li>
      <li>分类列表16</li>
      <li>分类列表17</li>
      <li>分类列表18</li>
      <li>分类列表19</li>
      <li>分类列表20</li>
      <li>分类列表21</li>
      <li>分类列表22</li>
      <li>分类列表23</li>
      <li>分类列表24</li>
      <li>分类列表25</li>
      <li>分类列表26</li>
      <li>分类列表27</li>
      <li>分类列表28</li>
      <li>分类列表29</li>
      <li>分类列表30</li>
      <li>分类列表31</li>
      <li>分类列表32</li>
      <li>分类列表33</li>
      <li>分类列表34</li>
      <li>分类列表35</li>
      <li>分类列表36</li>
      <li>分类列表37</li>
      <li>分类列表38</li>
      <li>分类列表39</li>
      <li>分类列表40</li>
      <li>分类列表41</li>
      <li>分类列表42</li>
      <li>分类列表43</li>
      <li>分类列表44</li>
      <li>分类列表45</li>
      <li>分类列表46</li>
      <li>分类列表47</li>
      <li>分类列表48</li>
      <li>分类列表49</li>
      <li>分类列表50</li>
      <li>分类列表51</li>
      <li>分类列表52</li>
      <li>分类列表53</li>
      <li>分类列表54</li>
      <li>分类列表55</li>
      <li>分类列表56</li>
      <li>分类列表57</li>
      <li>分类列表58</li>
      <li>分类列表59</li>
      <li>分类列表60</li>
      <li>分类列表61</li>
      <li>分类列表62</li>
      <li>分类列表63</li>
      <li>分类列表64</li>
      <li>分类列表65</li>
      <li>分类列表66</li>
      <li>分类列表67</li>
      <li>分类列表68</li>
      <li>分类列表69</li>
      <li>分类列表70</li>
      <li>分类列表71</li>
      <li>分类列表72</li>
      <li>分类列表73</li>
      <li>分类列表74</li>
      <li>分类列表75</li>
      <li>分类列表76</li>
      <li>分类列表77</li>
      <li>分类列表78</li>
      <li>分类列表79</li>
      <li>分类列表80</li>
      <li>分类列表81</li>
      <li>分类列表82</li>
      <li>分类列表83</li>
      <li>分类列表84</li>
      <li>分类列表85</li>
      <li>分类列表86</li>
      <li>分类列表87</li>
      <li>分类列表88</li>
      <li>分类列表89</li>
      <li>分类列表90</li>
      <li>分类列表91</li>
      <li>分类列表92</li>
      <li>分类列表93</li>
      <li>分类列表94</li>
      <li>分类列表95</li>
      <li>分类列表96</li>
      <li>分类列表97</li>
      <li>分类列表98</li>
      <li>分类列表99</li>
      <li>分类列表100</li>
    </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  // created创建完组件后调用，还没有将template模板挂载，所有获取不到dom元素，因此也就不能在created中通过this.$refs.aaaa拿到对应标签
  // 最先能够拿到data和methods的是在created这个生命周期，最先能够操作真实dom的是在mounted这个生命周期
  /* 
  created() {
    // 可以传入一个类作为参数,BScroll的使用
    //  BetterScroll 是作用在外层 wrapper 容器上的，滚动的部分是 content 元素。这里要注意的是，
    // BetterScroll 默认处理容器（wrapper）的第一个子元素（content）的滚动，其它的元素都会被忽略。
    console.log(this.$refs.aaaa);   //输出undefined
    this.scroll = new BScroll(this.$refs.aaaa,{  //这里会报错 Can not resolve the wrapper DOM.
    });
  } 
  */
  mounted() {
    // ref如果是绑定在组件中的,那么通过this.$refs.refname获取到的是一个组件对象.
    // ref如果是绑定在普通的元素中,那么通过this.$refs.refname获取到的是一个元素对象
    // ref：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据
    //  console.log(this.$refs.aaaa);   
    //  console.log(document.querySelector('.wrapper'));  一般页面可能存在多个wrapper类，所以通过querySelector拿到的元素不准确
    this.scroll = new BScroll(this.$refs.aaaa, {
      probeType: 3,         //实时监控页面滚动
      pullUpLoad: true,
    });

    this.scroll.on("scroll", (position) => {
      console.log(position);
    });

    this.scroll.on("pullingUp", () => {
      console.log("上啦加载更多");
    });
  },

  methods: {
    btnClick() {
      console.log("btnClick");
    },
    divClick() {
      console.log("divClick");
    },
  },
};
</script>

// 这里得加上scoped，不然会造成与home页切换时，造成同名wrapper类被修改样式，
// 会造成home的滑动界面显示为150px，即会修改Scroll中的wrapper类的样式，所以建议vue文件中样式设置用scoped限定作用域
<style scoped>
.wrapper {
  height: 150px;
  background-color: red;

  overflow: hidden;
  /*overflow-y: scroll;*/
}
</style>