<template>
  <div>
    <el-dialog title="导入excel" width="600px" :visible.sync="show" append-to-body @close="closeForm">
      <el-upload v-if="!process" class="upload-demo" action :auto-upload="false" :show-file-list="false" :on-change="choose_file">
        <el-button size="mini" icon="el-icon-upload" type="primary">请选择导入excel</el-button> <span style="color:#ff0000">{{ file.name }}</span>
      </el-upload>
      <el-progress v-else :percentage="percentage" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" type="primary" @click="submit">
          <span v-if="!loading">确 定</span>
          <span v-else>提 交 中...</span>
        </el-button>
        <el-button @click="closeForm">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  name: 'DiyfieldsimportData',
  props: {
    show: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    controller: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: '',
      process: false,
      loading: false,
      excel_import_data: [],
      percentage: 0,
      page: 1,
      limit: 200
    }
  },
  methods: {
    choose_file(file) {
      this.file = file
      this.importExcel(file)
    },
    importExcel(file) {
      var excelData = []
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          Object.keys(workbook.Sheets).forEach((sheet) => {
            excelData.push(
              ...XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            )
          })
          this.excel_import_data = excelData
        } catch (e) {
          this.$message.danger('文件类型不正确')
        }
      }
      fileReader.readAsBinaryString(file.raw)
    },
    submit() {
      this.process = true
      this.loading = true
      const data = this.getData()
      const total_page = Math.ceil(this.excel_import_data.length / this.limit)
      this.percentage = Math.ceil(this.page * 100 / total_page)

      this.$api.post('/diyfields/importData/con/' + this.controller, data).then(res => {
        if (this.page <= total_page - 1) {
          this.page = this.page + 1
          this.submit()
        } else {
          this.$message({ message: '导入完成', type: 'success' })
          this.$emit('refesh_list')
          this.closeForm()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    getData() {
      const perdata = []
      for (let i = (this.page - 1) * this.limit; i < this.page * this.limit; i++) {
        if (this.excel_import_data[i]) {
          perdata.push(this.excel_import_data[i])
        }
      }
      return perdata
    },
    closeForm() {
      this.$emit('update:show', false)
      this.file = ''
      this.process = false
      this.percentage = 0
      this.loading = false
      this.page = 1
      this.limit = 200
    }
  }
}
</script>
