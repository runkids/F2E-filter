<template>
  <header class="head">
    <div class="title">
      <div>高雄景點查詢</div>
    </div>
    <div class="searchBar">
      <el-input placeholder="請輸入景點名稱" prefix-icon="el-icon-search"
        v-model="serchBarText" @change="inputChange"/>
    </div>
  </header>
</template>

<script>
export default {
  name: 'headBox',
  data() {
    return {
      serchBarText: '',
    };
  },

  methods: {
    inputChange() {
      this.$emit('change', this.serchBarText);
    },
  },
};
</script>

<style lang="scss">
 @import '../assets/mixin.scss';
  .head {
    @include wh(100%, 92px);
    background: #2490c2;
    display: flex;
    .title {
      font-family: 'Optima-ExtraBlack';
      color: white;
      font-size: 36px;
      margin: 25px 20px;
      margin-left: 78px;
      letter-spacing: 1px;
    }
    .searchBar {
      margin: 25px 20px;
      margin-left: 100px;
      .el-input__inner {
        z-index: 1;
        max-width: 350px;
        font-size: 20px;
        color: rgba(255, 255, 255, 0.918);
        // background: none;
      }
    }
  }

  @media screen and (max-width: 450px){
    .head{
      height: 130px;
       display: block;
      .title {
        padding-top: 10px;
        margin: 0 auto 5px auto;
        text-align: center;
      }
      .searchBar {
        display: flex;
        justify-content: center;
        margin-left: 35px;
        .el-input__inner {
          margin:initial;
          background: white;
        }
      }
    }
  }
</style>
