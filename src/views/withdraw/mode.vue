<template>
    <div>
        <el-table
            ref="multipleTable"
            v-loading="loading"
            :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
            :border="false"
            :stripe="true"
            class="eltable"
            :data="list"
            style="width: 100%"
        >
            <el-table-column align="center" property="mode_name" label="提现方式" show-overflow-tooltip width="" />
            <el-table-column align="center" property="pay_mode" label="打款方式" show-overflow-tooltip width="">
                <template slot-scope="scope">
                    <el-select 
                        v-if="scope.row.code == 'wxpay'"
                        v-model="scope.row.pay_mode" 
                        size="mini" 
                        placeholder="请选择" 
                        @change="listUpdate(scope.row,'pay_mode')"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select 
                        v-else
                        disabled
                        v-model="scope.row.pay_mode" 
                        size="mini" 
                        placeholder="请选择" 
                        @change="listUpdate(scope.row,'pay_mode')"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column align="center" property="status" label="状态" show-overflow-tooltip width="">
                <template slot-scope="scope">
                    <el-switch
                    v-model="scope.row.status"
                    :active-value="1"
                    :inactive-value="0"
                    @change="listUpdate(scope.row,'status')"
                    />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default{
    name: 'WithdrawMode',
    data(){
        return {
            list: [],
            loading: true,        
            options: [{
                value: 1,
                label: '手动'
            }, {
                value: 2,
                label: '自动'
            }]
        }
    },
    mounted() {
        this.index()
    },
    methods: {
        index(){
            this.$api.post('/withdraw/modes').then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        listUpdate(row, field) {
            if (row.id) {
                this.$api.post('/withdraw/modeListUpdate', {
                code: row.code,
                [field]: row[field]
                }).then(res => {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                })
            }
        },
    }
}
</script>
<style>

</style>