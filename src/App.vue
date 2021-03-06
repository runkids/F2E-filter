<template>
  <div id="app">
    <section class="main_content">

      <HeadBox @change="e => this.serchBar.inputText=e"></HeadBox>
      <div class="bg">
        <div class="aside">
          <div class="aside_box">
            <div class="box_content">
              <div class="text">地區</div>
              <el-select v-model="location.selectValue" class='localSelect'
                        clearable
                        placeholder="請選擇地區"
                        no-data-text='無資訊'>
                 <el-option v-for="item in location.options" :key="item.id" :label="item.value" :value="item.value"/>
              </el-select>
            </div>
          </div>
          <div class="aside_box tags">
            <div class="box_content">
              <div class="text">票價資訊</div>
              <el-checkbox  :indeterminate="checkbox.isIndeterminate" v-model="checkbox.checkAll"
                            @change="handleCheckAllChange">全選</el-checkbox>
               <el-checkbox-group v-model="checkbox.checkedOptions"
                                  @change="handleCheckedOptionsChange">
                <div v-for="item in checkbox.options" :key="item">
                  <el-checkbox :label="item" >{{item.length>10?`${item.substring(0,10)}...`:item}}</el-checkbox>
                </div>
               </el-checkbox-group>
            </div>
          </div>
        </div>

        <div class="main">
          <ScrollTopButton/>
          <div class="dataLength">
            共有 <AnimatedInteger :value="copyData.length"></AnimatedInteger> 筆資料
          </div>
          <div class='tags_box'>
            <el-tag class='options_tag' v-for="(tag,index) in checkbox.checkedOptions"
              :key="tag" closable  @close="tagClose(index)">
              {{tag}}
            </el-tag>
          </div>
          <div class="cards" v-loading="loading">
            <Card :openData.sync="filterData"></Card>
          </div>
          <Pagination :length="copyData.length" class="pagination"
            @paginationClick="resetTableDataWithPageNo"></Pagination>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import HeadBox from '@/components/head';
import Card from '@/components/card';
import Pagination from '@/components/pagination';
import ScrollTopButton from '@/components/scrollTopButton';
import AnimatedInteger from '@/components/animatedInteger';
import getData from '@/api/openData';

export default {
  name: 'App',
  components: {
    HeadBox,
    Pagination,
    Card,
    ScrollTopButton,
    AnimatedInteger,
  },
  data() {
    return {
      loading: false,
      initData: [], // 原始資料
      copyData: [], // 依照條件篩選後的資料
      filterData: [], // 要顯示在畫面上的資料
      serchBar: {
        inputText: '',
      },
      location: { // 地區下拉選單
        selectValue: '', // 選擇的值
        options: [], // 總共選項
      },
      checkbox: {
        checkAll: false,
        options: [],
        checkedOptions: [],
        isIndeterminate: true,
      },
    };
  },

  watch: {
    location: {
      handler() {
        this.matchData();
      },
      deep: true,
    },
    checkbox: {
      handler() {
        this.matchData();
      },
      deep: true,
    },
    serchBar: {
      handler() {
        this.matchData();
      },
      deep: true,
    },
  },

  methods: {
    // 初始化資料
    async getOpenData() {
      const { result: { records } } = await getData();
      // Array.form()
      this.checkbox.options = [...new Set(records.map(data => data.Ticketinfo))]
        .filter(res => !!res);

      this.location.options = [...new Set(records.map(data => data.Zone))]
        .map((res, index) => ({ id: index, value: res }));

      this.initData = [...records];

      this.initCopyData();
      this.resetTableDataWithPageNo(1);
    },

    // 重置資料
    initCopyData() {
      this.loading = true;
      // 要深層拷貝 Object.assign僅複製屬性值
      // 也可以用lodash _.cloneDeep
      // https://goo.gl/iJliSK
      this.copyData = JSON.parse(JSON.stringify(this.initData));
      this.filterData = JSON.parse(JSON.stringify(this.copyData));
      this.resetTableDataWithPageNo(1);
    },

    // 顯示目前頁數的10筆資料
    resetTableDataWithPageNo(showPageNo) {
      const record = 10;
      const checkFnc = (item, index) => index >= (record * (showPageNo - 1)) && index < showPageNo * record;
      this.filterData = this.copyData.filter(checkFnc);
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },

    filterDataByOptions(key, value) {
      this.copyData = this.copyData.filter(res => res[key].match(value));
    },

    // 搜尋bar結果的關鍵字加上顏色
    addColorForKeyWords(value) {
      this.copyData.forEach((item) => {
        item.Name = item.Name.replace(value, `<span style='color:#fd6769;'>${value}</span>`);
      });
    },

    // 根據 地區 搜尋bar過濾資料
    matchData() {
      this.initCopyData();

      if (this.location.selectValue) {
        this.filterDataByOptions('Zone', this.location.selectValue);
      }
      if (this.serchBar.inputText) {
        this.filterDataByOptions('Name', this.serchBar.inputText);
        this.addColorForKeyWords(this.serchBar.inputText);
      }
      if (this.checkbox.checkedOptions.length) {
        const catchArr = [];
        this.checkbox.checkedOptions.forEach((arr) => {
          this.copyData.forEach((res) => {
            if (res.Ticketinfo.match(arr)) catchArr.push(res);
          });
        });
        this.copyData = [...catchArr];
      }
      this.resetTableDataWithPageNo(1);
    },

    tagClose(index) {
      this.checkbox.checkedOptions.splice(index, 1);
      this.handleCheckedOptionsChange(this.checkbox.checkedOptions);
    },

    handleCheckAllChange(checkAll) {
      // 要assign一個新的 options 給 checkedOptions ， 否則呼叫tagClose時會真的把options的選項也跟著刪掉（因為Reference的問題）
      this.checkbox.checkedOptions = checkAll ? [...this.checkbox.options] : [];
      this.checkbox.isIndeterminate = false;
    },

    handleCheckedOptionsChange(options) {
      const checkedCount = options.length;
      this.checkbox.checkAll = checkedCount === this.checkbox.options.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkbox.options.length;
    },

  },

  created() {
    this.getOpenData();
  },
};

</script>

<style lang='scss'>
  @import './assets/reset.css';
  @import './assets/mixin.scss';

  html,body {
    font-family: 'Roboto', sans-serif, '微軟正黑體';
    box-sizing: border-box;
    // border: 1px solid black;
    .main_content {
      @include wh(100%,100%);
      background-color: #f2f2f2;

      .bg{
        display: flex;
        .aside{
          flex: 1; //這樣可以跟右邊main區塊等高顯示
          @include wh(20%,auto); //height auto這樣可以跟右邊main區塊等高顯示
          background: #ebebeb;

          .aside_box{
            @include wh(100%,127px);
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #929191;
            .box_content{
              margin: auto;
              padding-left: 30px;
              width: 90%;
            }
            .text{
              font-size: 20px;
              margin: 20px 20px 20px 0px;
            }

          }
          .tags{
            min-height: 300px;
            .el-checkbox{
              margin: 5px ;
            }
          }
          .localSelect{
            width:220px;
          }

        }

        .main{
          flex: 4;
          @include wh(80%,100%);
          min-height: 1080px;
          .dataLength{
            margin: 20px 0 0 40px;
            font-size: 24px;
            font-weight: 500;
            color: #4a90e2;
          }
          .tags_box{
            min-height: 50px;
            margin-left: 40px;
            .options_tag{
              margin: 10px 10px 0 0;
            }
          }
          .cards{
            padding: 30px;
          }
          .pagination{
            padding-bottom: 50px;
          }
          .el-tag{
            color:rgba(4, 78, 56, 0.993);
            background-color: rgba(17, 166, 172, 0.329);
          }
        }

      }
    }
  }

   @media screen and (max-width: 450px){
    .bg{
      display: block !important;
      .aside{
        min-width: 414px;
        .localSelect{
          width:340px !important;
        }
      }
      .main{
        min-width: 414px;
        .pagination{
          position: relative;
          padding-bottom: 30px;
          left: 10px;
        }
      }
    }
   }


</style>
