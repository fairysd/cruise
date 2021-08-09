<template>
  <div class="index">
    <div class="main">
      <div class="header">
        <div class="logo">
          <img src="../assets/logo/logo.svg" alt="" />
        </div>
        <div class="user">
          <img src="../assets/logo/avatar.jpg" alt="" />
        </div>
      </div>
      <div class="content">
        <div class="left">
          <ul class="menu">
            <li><i class="icon-dashboard"></i> DASHBOARD</li>
            <li class="active"><i class="icon-sitemap"></i> AGENT</li>
            <li><i class="icon-boat"></i> MY CRUISE</li>
            <li><i class="icon-life-bouy"></i> HELP</li>
          </ul>
          <div class="history">
            <h5>History</h5>
            <ul>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
              <li>bjstdmngbd02/acceptance_test</li>
            </ul>
          </div>
        </div>
        <router-view class="views"></router-view>
      </div>
      <div class="footer">© Copyright 2017 <strong>Thought</strong>Works</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang = 'scss'>
.index {
  background-color: #f3f3f3;
  .main {
    .header {
      width: 100%;
      height: 60px;
      position: relative;
      background-color: #fff;
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px;
      .logo {
        margin-top: 10px;
        img {
          height: 36px;
        }
      }
      .user {
        position: absolute;
        top: 10px;
        right: 300px;
        img {
          width: 40px;
          border-radius: 20px;
        }
      }
    }
    .content {
      height: 90vh;
      width: 1200px;
      margin: 0 auto;
      display: flex;
      .left {
        height: 100%;
        flex: 1;
        background-color: #2d4054;
        position: relative;
        .menu {
          margin-top: 30px;
          text-align: left;
          color: #f3f3f3;
          li {
            line-height: 45px;
            cursor: pointer;
            font-size: 16px;
            padding-left: 20px;
            i {
              margin-right: 8px;
            }
            &.active {
              color: #00b4cf;
              background-color: #435466;
            }
            &:hover {
              color: #00b4cf;
              background-color: #435466;
            }
          }
        }
        .history {
          width: 100%;
          position: absolute;
          text-align: left;
          bottom: 20px;
          h5 {
            font-size: 24px;
            color: #ccc;
            margin: 10px 0;
            padding-left: 10px;
          }
          ul {
            li {
              font-size: 12px;
              cursor: pointer;
              color: #999;
              list-style: disc inside;
              padding-left: 20px;
              line-height: 24px;
              &:hover {
                color: #00b4cf;
              }
            }
          }
        }
      }
      .views {
        flex: 3;
        padding-top: 20px;
      }
    }
    .footer {
      background-color: #fff;
      width: 100%;
      line-height: 20px;
      text-align: center;
      position: fixed;
      bottom: 0;
      padding: 5px 0;
      box-shadow: rgba(0, 0, 0, 0.2) 0 2px 4px;
    }
  }
}
</style>
