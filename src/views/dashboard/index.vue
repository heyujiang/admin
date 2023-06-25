<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="40" class="panel-group">
      <el-col class="card-panel-col">
        <div class="card-panel" @click="gotoapge('/order/service')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">{{ statistical.deliverOrder }}</div>
            <div class="card-panel-text">
              订单数
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col">
        <div class="card-panel" @click="gotoapge('/order/service')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">{{ statistical.order_paytotal }}</div>
            <div class="card-panel-text">
              成交金额
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col">
        <div class="card-panel" @click="gotoapge('/orderrefund/index')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">{{ statistical.returnOrder }}</div>
            <div class="card-panel-text">
              售后订单
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="card-panel-col">
        <div class="card-panel" @click="gotoapge('/member/index')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">{{ statistical.member_count }}</div>
            <div class="card-panel-text">
              会员数
            </div>
          </div>
        </div>
      </el-col>
      <el-col v-if="version=='v3'" class="card-panel-col">
        <div class="card-panel" @click="gotoapge('/technical/index')">
          <div class="card-panel-icon-wrapper icon-themaster">
            <svg-icon icon-class="themaster" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">{{ statistical.technical_count }}</div>
            <div class="card-panel-text">
              师傅数
            </div>
          </div>
        </div>
      </el-col>
      <el-col v-else class="card-panel-col">
        <div class="card-panel" @click="gotoapge('/agent/index')">
          <div class="card-panel-icon-wrapper icon-tree">
            <svg-icon icon-class="tree" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-num">{{ statistical.agent_count }}</div>
            <div class="card-panel-text">
              分销达人数
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;border-radius: 10px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="bottom_itemBox">
          <div class="flex_bbox">
            <div class="rank_title">销量排行TOP5</div>
            <!--<select class="rank_select" name="select_type1">
                <option value="1">本月</option>
                <option value="0">全部</option>
              </select>-->
          </div>
          <div>
            <table class="rank_tableBox">
              <thead>
                <tr>
                  <td style="width:10%;">排序</td>
                  <td style="width:80%;">名称</td>
                  <td style="width:10%;text-align:right;">销量</td>
                </tr>
              </thead>
              <tbody id="select1_tbody1" class="select1_box">
                <tr v-for="(item,index) in goodssaletop5" :key="index">
                  <td style="color:#fd0e3b;">{{ index+1 }}</td>
                  <td class="rank_tbody_td">{{ item.name }}</td>
                  <td style="text-align:right;">{{ item.sale_count }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div v-if="version=='v3'" class="bottom_itemBox">
          <div class="flex_bbox">
            <div class="rank_title">师傅服务排行TOP5</div>
            <!--<select class="rank_select" name="select_type1">
              <option value="1">本月</option>
              <option value="0">全部</option>
            </select>-->
          </div>
          <div>
            <table class="rank_tableBox">
              <thead>
                <tr>
                  <td style="width:15%;">排序</td>
                  <td style="width:65%;">姓名</td>
                  <td style="width:20%;text-align:right;">服务次数</td>
                </tr>
              </thead>
              <tbody id="select1_tbody1" class="select1_box">
                <tr v-for="(item,index) in service_timestop5" :key="index">
                  <td style="color:#fd0e3b;">{{ index+1 }}</td>
                  <td class="rank_tbody_td">{{ item.title }}</td>
                  <td style="text-align:right;">{{ item.service_times }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-else class="bottom_itemBox">
          <div class="flex_bbox">
            <div class="rank_title">会员付款排行TOP5</div>
            <!--<select class="rank_select" name="select_type1">
              <option value="1">本月</option>
              <option value="0">全部</option>
            </select>-->
          </div>
          <div>
            <table class="rank_tableBox">
              <thead>
                <tr>
                  <td style="width:15%;">排序</td>
                  <td style="width:65%;">姓名</td>
                  <td style="width:20%;text-align:right;">付款金额</td>
                </tr>
              </thead>
              <tbody id="select1_tbody1" class="select1_box">
                <tr v-for="(item,index) in consumedop5" :key="index">
                  <td style="color:#fd0e3b;">{{ index+1 }}</td>
                  <td class="rank_tbody_td">{{ item.nickname }}</td>
                  <td style="text-align:right;">{{ item.totleconsumed }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="bottom_itemBox">
          <div class="flex_bbox">
            <div class="rank_title">昨天转化</div>
          </div>
          <div :style="'background: url('+require('@/assets/data.png')+') no-repeat top;'" class="databox_show-right">
            <div class="title-list">
              <div class="li">访问人数</div>
              <div class="li">下单人数</div>
              <div class="li">支付订单数</div>
            </div>
            <div class="part1">
              <div>访问-支付</div>
              <span>转化率 {{ statistical.accessTopay_conversionrate }}%</span>
            </div>
            <div class="part2">
              <div>访问-下单</div>
              <span>转化率 {{ statistical.accessToorder_conversionrate }}%</span>
            </div>
            <div class="part3">
              <div>下单-支付</div>
              <span>转化率 {{ statistical.orderTopay_conversionrate }}%</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
export default {
  name: 'Dashboard',
  components: {
    LineChart
  },
  data() {
    return {
      version: '',
      lineChartData: {
        actualData: [0, 0, 0, 0, 0, 0, 0]
      },
      statistical: {},
      goodssaletop5: {},
      consumedop5: {},
      service_timestop5: {}
    }
  },
  mounted() {
    this.$api.post('/Dashboard/index').then(res => {
      this.version = res.data.version
      this.statistical = res.data.statistical
      this.goodssaletop5 = res.data.goodssaletop5
      this.consumedop5 = res.data.consumedop5
      this.service_timestop5 = res.data.service_timestop5
      this.lineChartData.actualData = res.data.clinchadeal
    })
    this.$api.get('/Dashboard/datainitial')
  },
  methods: {
    gotoapge(page) {
      this.$router.push({ path: page })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }

  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
      width: 20%;
    }

    .card-panel {
      height: 108px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }

        .icon-themaster {
          background: #36a3f7
        }
        .icon-tree {
          background: #36a3f7
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .icon-themaster {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          line-height: 36px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;

          text-align: center;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }

  /* 底部三格列表 */
  .flex_bbox {
    display: flex !important;
    align-items: center;
    justify-content: space-between;
  }

  .leftBottom_box.flex_bbox {
    align-items: flex-start;
  }

  .bottom_itemBox {
    min-height: 352px;
    background: #ffffff;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 30px;
    overflow: hidden;
  }

  .rank_title {
    color: #232323;
    font-size: 20px;
    font-weight: bold;
  }

  select.rank_select {
    font-size: 16px;
    color: #999999;
    border: 0;
    width: 58px;
    cursor: pointer;
  }

  table.rank_tableBox {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }

  .rank_tableBox thead tr {
    font-size: 16px;
    color: #333333;
    border-bottom: 1px solid #F0F0F0;
    text-align: left;
    height: 58px;
  }

  .rank_tableBox tbody tr td {
    padding-top: 20px;
    font-size: 16px;
    color: #333333;
  }

  .rank_tableBox tbody tr td.rank_tbody_td {
    color: #999999;
    width: 65%;
    word-break: break-all;
  }

  .databox_show-right {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    height: 162px;
  }

  .databox_show-right .title-list {
    display: block;
    text-align: center;
  }

  .databox_show-right .title-list .li {
    display: block;
    text-align: center;
    font-size: 14px;
    color: #fff;
    line-height: 47px;
  }

  .databox_show-right .part1 {
    position: absolute;
    top: 60px;
    left: 7px;
    text-align: center;
  }

  .databox_show-right .part2 {
    position: absolute;
    top: 33px;
    right: 20px;
    text-align: center;
  }

  .databox_show-right .part3 {
    position: absolute;
    top: 90px;
    right: 33px;
    text-align: center;
  }

  .databox_show-right span {
    color: #666;
    font-size: 12px;
  }

  .databox-ranking .content-ranking {
    min-height: 200px;
  }
</style>
