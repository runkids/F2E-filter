<template>
  <div>
    <el-card shadow="hover" v-for="d in arr" :key="d.Id">
      <div class='card_content'>
        <div class='pic' >
          <img :src="d.Picture1">
        </div>
        <div class='info'>
          <div class='top_box'>
            <div class='title'>{{d.Name}}</div>
            <el-tag class="options_tag" v-if='d.Ticketinfo'>
              {{d.Ticketinfo}}
            </el-tag>
          </div>
          <div class='desc'>{{d.Toldescribe}}</div>
          <div class="bottom_box">
            <el-popover placement="top" width="350" trigger="click">
              <div class='mapbox'>
                <div :id='`${d._id}map`' style="clear:both;min-height:400px;max-height:800px;"></div>
              </div>
              <div class="address el-icon-news" slot="reference"
                  @click="genMap([d._id,d.Name,d.Picture1,d.Add],{lat: +d.Py,lng: +d.Px})">
                 {{d.Add}}
                 <el-tooltip effect="dark" content="點擊顯示地圖位置" placement="right-start">
                  <img src='https://goo.gl/w8NN6B' style="width:20px;">
                 </el-tooltip>
              </div>
            </el-popover>
            <div class="openTime el-icon-time"> {{d.Opentime}}</div>
            <div class="tel el-icon-phone-outline"> {{d.Tel}}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['openData'],

  data() {
    return {
      arr: this.openData,
      google: {
        map: null,
        marker: null,
        infowindow: null,
      },
    };
  },

  watch: {
    openData(v) {
      this.arr = v;
    },
  },

  methods: {
    /* eslint-disable */
    genMap([id, title, pic, address], point) {
      const vm = this;
      this.google.map = new google.maps.Map(document.getElementById(`${id}map`), {
        center: point,
        zoom: 18,
      });
      this.google.marker = new google.maps.Marker({
        position: point,
        map: vm.google.map,
        animation: google.maps.Animation.DROP,
      });
      this.google.marker.setMap(this.google.map);
      // this.google.infoWindow = new google.maps.InfoWindow({
      //   content: `
      //     <div>${title} <a href='https://www.google.com/maps/place/${address}'  target='_blank'></div>
      //     <img src='${pic}'/>
      //   `,
      // });
      // this.google.infowindow.open(this.google.map, this.google.marker);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/mixin.scss';

.el-card{
  letter-spacing: 1px;
  min-height: 250px;
  margin: 15px 15px;
  .card_content{
    display: flex;
    .info{
      padding-left: 30px;
      padding-right: 30px;
      .top_box{
        display: flex;
        margin-bottom:10px;
        .options_tag{
          margin-left: 20px ;
        }
        .title{
          font-size: 24px;
          color: rgb(19, 113, 254);
          line-height: 36px;
        }
      }
      .desc{
        color:rgb(35, 35, 36);
        letter-spacing: 2px;
        line-height: 20px;
      }
      .bottom_box{
        padding: 10px 10px;
        display: flex;
        flex-direction: column;
        .address{
          cursor: pointer;
        }
        [class*=" el-icon-"]{
          margin-bottom: 5px;
        }
      }
    }
    .pic{
      border: 2px solid rgb(99, 95, 95);
      width: 300px;
      height: 220px;
      box-shadow: 5px 5px 20px rgba(99, 95, 95, 0.842);
      img {
        width: 300px;
        height: 220px;
      }
    }
  }
}

 @media screen and (max-width: 450px){
    .el-card{
      margin: 5px 1px 5px 1px;
      .card_content{
        display: block !important;
        .info{
          padding-left: 5px;
          padding-right: 5px;
          .top_box{
            margin-top:15px;
            display: flex;
            flex-direction: column;
          }
          .pic{
            border: 2px solid #00000094;
            height: 150px !important;
            width: 150px !important;
            margin-bottom: 10px;
            img {
              width: 150px;
              height: 150px;
            }
          }
           .bottom_box{
            padding: 10px 10px;
            display: flex;
            flex-direction: column;
            font-size: 10px;
            [class*=" el-icon-"]{
              margin-bottom: 5px;
              margin-left: -10px;
            }
          }
        }
      }
    }
  }

</style>
