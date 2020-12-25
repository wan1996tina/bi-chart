<template lang="pug">
  div
</template>

<script>
export default {
  props: {
    // 显示的水印文本
    inputText: {
      type: String,
      default: 'waterMark水印'
    },
    // 是否允许通过js或开发者工具等途径修改水印DOM节点（水印的id，attribute属性，节点的删除）
    // true为允许，默认不允许
    inputAllowDele: {
      type: Boolean,
      default: false
    },
    // 是否在组件销毁时去除水印节点（前提是允许用户修改DOM，否则去除后会再次自动生成）
    // true会，默认不会
    inputDestroy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      maskDiv: {},
      canvasOption: {
        id: 'canvas',
        width: 200,
        height: 100
      },
      ctxOption: {
        font: 'normal 18px Microsoft Yahei',
        fillStyle: 'rgba(112, 113, 114, 1)'
      }
    }
  },
  mounted () {
    //  确认DOM渲染后再执行
    this.$nextTick(() => {
      this.init()
      if (!this.inputAllowDele) {
        // 设置水印节点修改的DOM事件
        this.Monitor()
      }
    })
  },
  methods: {
    init () {
      const canvas = document.createElement('canvas')
      canvas.id = this.canvasOption.id
      canvas.width = this.canvasOption.width
      canvas.height = this.canvasOption.height

      this.maskDiv = document.createElement('div')

      const ctx = canvas.getContext('2d')
      ctx.font = this.ctxOption.font
      ctx.fillStyle = this.ctxOption.fillStyle
      ctx.fillText(this.inputText, 30, 20)

      const src = canvas.toDataURL('image/png')
      console.log('canvas', canvas)
      this.maskDiv.classList.add('mask-wrapper')
      this.maskDiv.id = '_waterMark'
      this.maskDiv.style.backgroundImage = `URL(${src})`

      document.body.appendChild(this.maskDiv)
    },
    Monitor () {
      const body = document.getElementsByTagName('body')[0]
      const options = {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterOldData: true
      }
      const observer = new MutationObserver(this.callback)
      observer.observe(body, options)
    },
    callback (mutations, observer) {
      if (mutations[0].target.id === '_waterMark') {
        this.removeMaskDiv()
      }
      if (mutations[0].attributeName === 'id') {
        this.removeMaskDiv()
        this.init()
      }
      if (mutations[0].removedNodes[0] && mutations[0].removedNodes[0].id === '_waterMark') {
        this.init()
      }
    },
    removeMaskDiv () {
      document.body.removeChild(this.maskDiv)
    },
    createMaskDiv () {
      this.init()
    }
  },
  watch: {
    inputText () {
      this.$nextTick(() => {
        this.removeMaskDiv()
      })
    }
  },
  destroyed () {
    if (this.inputDestroy) {
      this.removeMaskDiv()
    }
  }
}

</script>

<style>
.mask-wrapper {
  position: fixed;
  z-index: 9999;
  top: 50%;
  right: 50%;
  height: 40px;
  width: 200px;
  pointer-events: none;
}
</style>
