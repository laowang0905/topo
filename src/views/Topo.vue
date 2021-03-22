<template>
  <div class="topo-container">
    <el-container>
      <el-header>
        <el-row class="header-wrapper">
          <el-col :span="6" class="header-right">拓扑发现</el-col>
          <el-col :span="18" class="header-left">
            <ul class="tool-box">
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="编辑"
                >
                  <el-button
                    slot="reference"
                    :class="{ isActive: this.toolSelect == 'edit' }"
                    @click="handleEdit"
                    ><img src="~@/assets/img/icon/tool_icon/edit.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="全屏"
                >
                  <el-button slot="reference"
                    ><img
                      src="~@/assets/img/icon/tool_icon/quanping.png"
                      alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="居中"
                >
                  <el-button slot="reference"
                    ><img
                      src="~@/assets/img/icon/tool_icon/align-center.png"
                      alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="预览"
                >
                  <el-button slot="reference"
                    ><img src="~@/assets/img/icon/tool_icon/yulan.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="保存"
                >
                  <el-button slot="reference"
                    ><img src="~@/assets/img/icon/tool_icon/baocun.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="复制"
                >
                  <el-button slot="reference"
                    ><img src="~@/assets/img/icon/tool_icon/fuzhi.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="删除"
                >
                  <el-button slot="reference"
                    ><img src="~@/assets/img/icon/tool_icon/shanchu.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
              <!--<li class="tool-box-item">
            <el-popover  popper-class="popover"
                  placement="bottom-end" trigger="hover" content="清空">
              <el-button slot="reference"
                ><img src="~@/assets/img/icon/tool_icon/edit.png" alt=""
              /></el-button>
            </el-popover>
          </li> -->
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="放大"
                >
                  <el-button slot="reference"
                    ><img src="~@/assets/img/icon/tool_icon/fangda.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
              <li class="tool-box-item">
                <el-popover
                  popper-class="popover"
                  placement="bottom-end"
                  trigger="hover"
                  content="缩小"
                >
                  <el-button slot="reference"
                    ><img src="~@/assets/img/icon/tool_icon/zoomout.png" alt=""
                  /></el-button>
                </el-popover>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-aside width="200px">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="拓扑图" name="1"> </el-collapse-item>
          <el-collapse-item title="连线类型" name="2">
            <ul class="line">
              <li
                class="line-item"
                :class="{ isActive: currentLine == index }"
                v-for="(item, index) in lineList"
                :key="item.img"
                @click="handleLineClick(index, item.type, item.direction)"
              >
                <img
                  :src="require('@/assets/img/line/' + item.img + '.png')"
                  :alt="item.style"
                />
                <span>{{ item.style }}</span>
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="资产列表" name="3">
            <ul class="assets">
              <li
                class="assets-item"
                v-for="item in assetList"
                :key="item.img"
                topo-div-type="topo-node"
              >
                <img :src="'/assets/' + item.img + '.png'" :alt="item.name" />
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item title="控制设备" name="4"> </el-collapse-item>
        </el-collapse>
      </el-aside>
      <el-main>
        <SketchRule
          ref="SketchRule"
          :width="sketchConfig.ruleWidth"
          :height="sketchConfig.ruleHeight"
          :horLineArr="sketchConfig.hLine"
          :verLineArr="sketchConfig.vLine"
          :palette="sketchConfig.palette"
        >
        </SketchRule>
        <div class="content-box" id="topology-body">
          <NodeMenu></NodeMenu>
          <TextPosMenu></TextPosMenu>
          <canvas id="topology-canvas"> </canvas>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { rootPath } from "@/assets/js/util.js";
import NodeMenu from "@/components/clickMenu/NodeMenu";
import TextPosMenu from "@/components/clickMenu/TextPosMenu";

import "@/assets/js/jtopo-0.4.8-dev.js";
import { TopologyEditor } from "@/assets/js/jtopo-editor.js";
import "@/assets/js/jtopo-util.js";
import SketchRule from "vue-sketch-ruler";
export default {
  name: "topo",
  data() {
    return {
      toolSelect: "",
      currentLine: 0,
      lineList: [
        { style: "直线", img: "line", type: "line" },
        {
          style: "折线(横向)",
          img: "foldline_horizontal",
          type: "foldLine",
          direction: "horizontal",
        },
        {
          style: "折线(纵向)",
          img: "foldline_vertical",
          type: "foldLine",
          direction: "vertical",
        },
        {
          style: "二次折线(横向)",
          img: "flexline_horizontal",
          type: "flexLine",
          direction: "horizontal",
        },
        {
          style: "二次折线(纵向)",
          img: "flexline_vertical",
          type: "flexLine",
          direction: "vertical",
        },
        { style: "曲线", img: "curveline", type: "curveline" },
      ],

      assetList: [
        { name: "工控设备", img: "icon_switcher" },
        { name: "安全设备", img: "icon_router" },
        { name: "安防设备", img: "icon_route_controller" },
        { name: "网络设备", img: "icon_firewall" },
        { name: "服务器", img: "icon_balancer" },
        { name: "终端主机", img: "icon_ap" },
      ],
      activeName: "3",
      sketchConfig: {
        ruleWidth: 0,
        ruleHeight: 0,
        hLine: [],
        vLine: [],
        palette: {
          bgColor: "rgba(225,225,225, 0)",
          longfgColor: "#BABBBC",
          shortfgColor: "#C8CDD0",
          fontColor: "#7D8694",
          shadowColor: "transparent",
          lineColor: "#999",
          borderColor: "#DADADC",
          cornerActiveColor: "rgb(235, 86, 72, 0.6)",
        },
      },
    };
  },
  mounted() {
    const editor = new TopologyEditor();
    console.log(editor);
    window.editor = editor;
    this.$nextTick(() => {
      this.initCanvas();
      this.initDraggableIcons();
      this.initMenus();
    });
    this.loadTopo("/json/network.json", "/backimg.png");
  },
  methods: {
    handleEdit() {
      if (this.toolSelect == "edit") {
        this.toolSelect = "";
        editor.stageMode = "normal";
      } else {
        this.toolSelect = "edit";
        editor.stageMode = "edit";
      }
    },
    // 清除辅助线
    clearAll() {
      this.sketchConfig.hLine = [];
      this.sketchConfig.vLine = [];
    },
    // 选择line
    handleLineClick(index, type, direction = "") {
      this.currentLine = index;
      editor.lineType = type;
      editor.config.direction = direction;
    },
    // init canvas and rules
    initCanvas() {
      let canvas = document.getElementById("topology-canvas");
      canvas.height = $(".content-box").height();
      canvas.width = $(".content-box").width();
      this.sketchConfig.ruleWidth = $(".h-container")[0].offsetWidth;
      this.sketchConfig.ruleHeight = $(".v-container")[0].offsetHeight;
    },
    // init 可拖动icon
    initDraggableIcons() {
      let nodes = $("[topo-div-type='topo-node']");
      let nodeLength = nodes.length;
      for (var i = 0; i < nodeLength; i++) {
        var text = $(nodes[i]).find("span").eq(0).text();
        editor.drag(nodes[i], document.getElementById("topology-canvas"), text);
      }
    },
    // init menu
    initMenus() {
      editor.initMenus();
    },
    loadTopo(url, bg) {
      editor.loadTopology(url, bg);
    },
  },
  components: {
    SketchRule,
    NodeMenu,
    TextPosMenu,
  },
};
</script>

<style lang="less">
.topo-container {
  width: 100%;
  .tool-box {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    .tool-box-item {
      list-style: none;
      img {
        width: 16px;
      }
    }
  }
  .el-button {
    border: none;
    &:hover {
      background-color: transparent;
    }
    &.isActive {
      background-color: #ecf5ff;
    }
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    height: 100vh;
    .line {
      padding-left: 0;
      .line-item {
        transition: all 0.5s;
        cursor: pointer;
        width: 50%;
        margin: 0 auto;
        align-items: center;
        list-style: none;
        display: flex;
        flex-direction: column;
        &.isActive {
          background-color: rgb(208, 212, 221);
        }
        img {
          width: 3rem;
        }
        span {
          text-align: center;
        }
      }
    }
    .assets {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      .assets-item {
        display: flex;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        width: 33%;
        list-style: none;
        img {
          width: 40%;
          flex: 1;
        }
        span {
          width: 100%;
          font-size: 12px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .el-main {
    position: relative;
    padding: 0;
    background-color: #e9eef3;
    color: #333;
    width: calc(100vw - 200px);
    .content-box {
      position: relative;
      padding: 16px;
      // padding-left: 16px;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      #topology-canvas {
        // width: 100%;
        // height: 100%;
        // background-color: #eee;
      }
    }
  }

  .el-header {
    padding: 0;
  }
  .header-wrapper {
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    .header-right {
      font-size: 1.5rem;
      padding-left: 2rem;
    }
  }
  .el-collapse-item__header {
    padding-left: 1.5em;
  }
  .el-collapse-item__wrap {
    border-top: 1px solid #ebeef5;
  }
}
.popover {
  min-width: 0 !important;
  padding: 0.2rem 0.5rem !important;
}
</style>
