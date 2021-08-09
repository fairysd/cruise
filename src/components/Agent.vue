<template>
  <div class="agent">
    <div class="state">
      <div class="card">
        <h6 class="title">Building</h6>
        <strong class="num">3</strong>
        <i class="icon-cog"></i>
      </div>
      <div class="card">
        <h6 class="title">Idle</h6>
        <strong class="num">5</strong>
        <i class="icon-coffee"></i>
      </div>
      <div class="card">
        <ul class="indicate">
          <li>ALL</li>
          <li>PHYSICAL</li>
          <li>VIRTURAL</li>
        </ul>
        <ul class="value">
          <li>8</li>
          <li>4</li>
          <li>4</li>
        </ul>
      </div>
    </div>
    <div class="tab">
      <div class="btns">
        <button class="active">All</button>
        <button>Physical</button>
        <button>Virtual</button>
      </div>
      <div class="search">
        <i class="icon-search"></i>
        <input type="text" />
      </div>
      <div class="list-type">
        <i class="icon-th-card"></i>
        <i class="icon-th-list active"></i>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(item, index) in listData" :key="item.id">
        <div class="sys">
          <img :src="require(`../assets/OSIcons/${item.os}.png`)" alt="" />
        </div>
        <div class="detail">
          <div class="status">
            <div class="name">
              <i class="icon-desktop"></i><span v-text="item.name"></span>
            </div>
            <div class="action">
              <span :class="item.status" v-text="item.status"></span>
            </div>
            <div class="ip">
              <i class="icon-info"></i><span v-text="item.ip"></span>
            </div>
            <div class="address">
              <i class="icon-folder"></i><span v-text="item.location"></span>
            </div>
          </div>
          <div class="oprate">
            <div class="sys-list">
              <button @click="openPopup($event, index)">
                <i class="icon-plus"></i>
              </button>
              <p class="sys-item" v-for="(res, resIndex) in item.resources">
                <span v-text="res"></span
                ><i @click="deleteRes(index, resIndex)" class="icon-trash"></i>
              </p>
            </div>
            <div class="deny">
              <button v-if="item.status == 'building'">
                <i class="icon-deny"></i><span>Deny</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="popup"
        :style="{ top: popTop }"
        v-show="pupupVisible"
        ref="popup"
      >
        <p class="tip">Separate multiple resource name with commas</p>
        <input
          placeholder="e.g. Chrome,Firefox"
          type="text"
          v-model="browser"
        />
        <div class="btns">
          <button @click="addResource" class="add">Add Resources</button>
          <button @click="closePop" class="cancel">Cancel</button>
        </div>
        <div @click="closePop" class="close">
          <i class="icon-close"></i>
        </div>
        <div class="triangle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Agent",
  data() {
    return {
      listData: [],
      currentIndex: 0,
      popTop: "0",
      pupupVisible: false,
      browser: "",
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "http://localhost:3001/agents",
    })
      .then((response) => {
        this.listData = response.data;
      })
      .catch((error) => {
        console.log(error); //请求失败返回的数据
      });
  },
  mounted() {
    document.body.addEventListener("click", this.closePopByClick, true);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.closePopByClick, true);
  },
  methods: {
    openPopup(e, index) {
      this.popTop = e.currentTarget.offsetTop + 50 + "px";
      this.currentIndex = index;
      this.openPop();
    },
    addResource() {
      let index = this.currentIndex;
      let id = this.listData[index].id;
      let newResources = this.browser && this.browser.split(",");
      let data = JSON.parse(JSON.stringify(this.listData[index]));
      data.resources = [...this.listData[index].resources, ...newResources];
      this.$axios({
        method: "put",
        url: `http://localhost:3001/agents/${id}`,
        data: data,
      })
        .then((response) => {
          if (response.statusText == "OK") {
            this.listData[index] = response.data;
            this.closePop();
          }
        })
        .catch((error) => {
          console.log(error); //请求失败返回的数据
        });
    },
    deleteRes(index, resIndex) {
      this.listData[index].resources.splice(resIndex, 1);
    },
    closePopByClick(e) {
      if (this.pupupVisible && !this.$refs.popup.contains(e.target)) {
        this.closePop();
      }
    },
    openPop() {
      this.pupupVisible = true;
    },
    closePop() {
      this.pupupVisible = false;
      this.browser = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = 'scss'>
.agent {
  position: relative;
  .state {
    display: flex;
    .card {
      flex: 1;
      height: 116px;
      margin-left: 20px;
      text-align: left;
      color: #fff;
      position: relative;
      .title {
        margin-top: 20px;
        line-height: 32px;
        font-size: 18px;
        font-weight: bold;
        text-indent: 20px;
      }
      .num {
        margin-top: 30px;
        margin-right: 20px;
        text-align: right;
        font-size: 48px;
        position: absolute;
        bottom: 0;
        line-height: 84px;
        right: 0;
      }
      i {
        position: absolute;
        font-size: 144px;
        opacity: 0.2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
      &:nth-child(1) {
        background-color: #ff9a2a;
      }
      &:nth-child(2) {
        background-color: #7fbc39;
      }
      &:nth-child(3) {
        background-color: #fff;
        color: #000;
        .indicate {
          font-size: 12px;
          line-height: 56px;
        }
        .value {
          line-height: 60px;
          font-size: 20px;
        }
        ul {
          display: flex;
          li {
            text-align: center;
            flex: 1;
          }
        }
      }
    }
  }
  .tab {
    display: flex;
    height: 50px;
    background-color: #fff;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    .btns {
      flex: 2;
      display: flex;
      button {
        line-height: 50px;
        border: none;
        background-color: transparent;
        flex: 1;
        cursor: pointer;
        border-right: 1px solid #ccc;
        &.active {
          color: #00b4cf;
          border-bottom: 3px solid #00b4cf;
        }
      }
    }
    .search {
      flex: 3;
      line-height: 50px;
      text-align: left;
      position: relative;
      i {
        position: absolute;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        color: #e1e4e6;
        left: 34px;
      }
      input {
        margin-left: 30px;
        height: 32px;
        line-height: 32px;
        background-color: #f3f3f3;
        border: none;
        padding-left: 24px;
      }
    }
    .list-type {
      flex: 1;
      display: flex;
      i {
        flex: 1;
        font-size: 20px;
        text-align: center;
        line-height: 50px;
        &.active {
          color: #00b4cf;
        }
      }
    }
  }
  .list {
    margin-left: 20px;
    overflow: auto;
    height: 66vh;
    position: relative;
    .item {
      background-color: #fff;
      display: flex;
      padding: 10px 0;
      .sys {
        flex: 1;
      }
      .detail {
        flex: 8;
      }
    }
    .status {
      display: flex;
      text-align: left;
      font-size: 14px;
      line-height: 32px;
      i {
        font-size: 16px;
        text-align: center;
        vertical-align: text-bottom;
      }
      > div {
        span {
          padding-left: 6px;
        }
      }
      .name {
        flex: 4;
        span {
          color: #00b4cf;
          font-weight: bold;
        }
      }
      .action {
        span {
          color: #fff;
          padding: 2px 5px;
        }
        .building {
          background-color: #ff9a2a;
        }
        .idle {
          background-color: #7fbc39;
        }
        flex: 1;
      }
      .ip {
        flex: 2;
      }
      .address {
        flex: 4;
      }
    }
    .oprate {
      display: flex;
      margin-top: 20px;
      text-align: left;
      .sys-list {
        button {
          background-color: #0a869a;
          color: #fff;
          border: none;
          line-height: 22px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background-color: #00b4cf;
          }
          i {
            font-size: 16px;
            vertical-align: middle;
          }
        }
        .sys-item {
          display: inline-block;
          background-color: #e1e4e6;
          color: #435466;
          font-weight: bold;
          padding: 4px 10px;
          margin-left: 5px;
          vertical-align: bottom;
          i {
            margin-left: 10px;
            font-weight: bold;
            cursor: pointer;
          }
        }
        flex: 7;
      }
      .deny {
        font-size: 14px;
        line-height: 30px;
        flex: 1;
        text-align: center;
        cursor: pointer;
        button {
          border: none;
          background-color: transparent;
          color: #fff;
          padding: 5px 10px;
          background-color: #00b4cf;
        }
        i {
          margin-right: 6px;
        }
      }
    }
  }
  .popup {
    overflow: visible;
    width: 570px;
    position: absolute;
    left: 1px;
    border: 1px solid #00b4cf;
    background-color: #fff;
    box-shadow: rgba($color: #000, $alpha: 0.3) 0 3px 5px;
    padding: 15px 10px;
    text-align: left;
    p {
      margin: 15px 0;
    }
    input {
      width: 480px;
      height: 28px;
      line-height: 28px;
      margin-bottom: 20px;
      color: #00b4cf;
      padding-left: 12px;
      border: 1px solid #ccc;
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px;
      outline: none;
      &:focus {
        outline: none;
      }
    }
    .btns {
      margin-top: 10px;
      button {
        color: #fff;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        &.add {
          background-color: #0a869a;
          margin-right: 15px;
          &:hover {
            background-color: #00b4cf;
          }
        }
        &.cancel {
          background-color: #2d4054;
          &:hover {
            background-color: #435466;
          }
        }
      }
    }
    .close {
      position: absolute;
      cursor: pointer;
      top: 20px;
      right: 20px;
      i {
        font-size: 24px;
        text-align: center;
        font-weight: bold;
        color: #00b4cf;
      }
    }
    .triangle {
      overflow: visible;
      position: absolute;
      top: -40px;
      left: 96px;
      display: block;
      width: 0;
      height: 0;
      border-width: 20px 10px;
      border-style: solid;
      border-color: transparent transparent #00b4cf transparent;
      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-width: 20px 10px;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        top: -18px;
        left: -10px;
      }
    }
  }
}
</style>
