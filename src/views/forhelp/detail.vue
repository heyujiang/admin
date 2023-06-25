<template>
  <div>
    <el-dialog title="查看详情" width="800px" class="icon-dialog" :visible.sync="show" :before-close="closeForm" append-to-body @open="open">
      <table class="table table-bordered" align="center" width="100%" style="word-break:break-all; margin-bottom:50px;  font-size:13px;">
        <tbody>
          <tr>
            <td class="title" width="100">用户名：</td>
            <td>
              {{ form.username }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">手机：</td>
            <td>
              {{ form.tel }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">内容：</td>
            <td>
              {{ form.title }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">发送地址：</td>
            <td>
              {{ form.dizhi }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">经纬度：</td>
            <td>
              {{ form.latitude }},{{ form.longitude }}
            </td>
          </tr>
          <tr>
            <td class="title" width="100">创建时间：</td>
            <td>
              {{ parseTime(form.create_time) }}
            </td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Forhelpdetail',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    info: {
      type: Object
    }
  },
  data() {
    return {
      form: {
      }
    }
  },
  methods: {
    open() {
      this.$api.post('/forhelp/detail', this.info).then(res => {
        this.form = res.data
      })
    },
    closeForm() {
      this.$emit('update:show', false)
    }
  }
}
</script>
