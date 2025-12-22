<template>
    <el-card>
        <el-button type="primary" icon="Plus" @click="addHandle">
            添加品牌
        </el-button>
        <!-- 表格 -->
        <el-table border class="mt-10 mb-10" row-key="id" :data="tradeMarkArr">
            <el-table-column
                label="序号"
                width="80px"
                align="center"
                type="index"
            ></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="LOGO" prop="logoUrl">
                <template #default="{ row }">
                    <img :src="row.logoUrl" alt="" style="height: 24px" />
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button
                        size="small"
                        icon="Edit"
                        @click="editHandle(row)"
                    ></el-button>
                    <el-popconfirm
                        title="确认删除?"
                        @confirm="deleteHandle(row)"
                    >
                        <template #reference>
                            <el-button
                                size="small"
                                type="danger"
                                icon="Delete"
                            ></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 20, 30]"
            layout=" prev, pager, next, jumper, ->, total, sizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </el-card>
    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500">
        <el-form
            ref="tradeMarkRef"
            :model="form"
            :rules="rules"
            style="width: 80%"
        >
            <el-form-item
                label="品牌名称"
                :label-width="labelWidth"
                prop="tmName"
            >
                <el-input
                    v-model="form.tmName"
                    placeholder="请输入品牌名称"
                    autocomplete="off"
                />
            </el-form-item>
            <el-form-item
                label="品牌Logo"
                :label-width="labelWidth"
                prop="logoUrl"
            >
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="imageUrl"
                        :src="imageUrl"
                        class="avatar"
                        style="width: 100%; height: 178px"
                    />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancelHandle">取消</el-button>
                <el-button type="primary" @click="confirmHandle">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
defineOptions({
    name: 'TrademarkIndex',
})
import { ref, onMounted, reactive } from 'vue'
import {
    reqHasTradeMark,
    reqAddOrUpdateTradeMark,
    reqDeleteTradeMark,
} from '@/api/product/trademark'
import type { Records, TradeMark } from '@/api/product/trademark/type.ts'
import { ElMessage, type UploadProps, type UploadRawFile } from 'element-plus'
onMounted(() => {
    getHasTradeMark()
})

/******************** 表格 ********************/
const currentPage = ref(1)
let pageSize = ref(3)
const total = ref(0)
let tradeMarkArr = ref<Records>([])
// 改变 pageSize
function handleSizeChange() {
    currentPage.value = 1
    getHasTradeMark()
}
// 分页变化
function handleCurrentChange() {
    getHasTradeMark()
}
// 获取数据
async function getHasTradeMark(page: number = 1) {
    const paramPage = Math.max(page || currentPage.value, 1)
    try {
        const res = await reqHasTradeMark(paramPage, pageSize.value)
        if (res.code === 200) {
            total.value = res.data.total
            tradeMarkArr.value = res.data.records
        }
    } catch (e) {
        console.log(e)
    }
}
// 删除
async function deleteHandle(row: TradeMark) {
    try {
        const res = await reqDeleteTradeMark(row.id as number)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            await getHasTradeMark(
                tradeMarkArr.value.length > 1
                    ? currentPage.value
                    : currentPage.value - 1,
            )
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败',
            })
        }
    } catch (e) {
        console.log(e)
    }
}
// 编辑
function editHandle(row: TradeMark) {
    dialogVisible.value = true
    dialogTitle.value = '编辑品牌'
    form.logoUrl = row.logoUrl
    form.tmName = row.tmName
    form.id = row.id
    imageUrl.value = row.logoUrl
    clearValidateMessage()
}
/******************** 弹窗 ********************/
const dialogVisible = ref(false)
const dialogTitle = ref('添加品牌')
const tradeMarkRef = ref()
const form = reactive<TradeMark>({ tmName: '', logoUrl: '' })
const imageUrl = ref('')

// 上传图片校验
const urlValidator = (_rule: unknown, value: string, callback: () => void) => {
    if (value) {
        callback()
    } else {
        return new Error('请上传图片')
    }
}
const rules = reactive({
    tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
    logoUrl: [
        {
            required: true,
            message: '请上传图片',
            trigger: 'blur',
            validator: urlValidator,
        },
    ],
})
const labelWidth = ref('90px')
// 上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (res) => {
    console.log(res)
    form.logoUrl = res.data
    imageUrl.value = res.data
    // 清空校验信息
    tradeMarkRef.value?.clearValidate('logoUrl')
}
// 上传前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const { type } = rawFile
    const acceptType = ['image/png', 'image/jpeg', 'image/gif']
    if (acceptType.includes(type)) {
    } else {
        ElMessage({
            type: 'error',
            message: `上传的文件格支持：${acceptType.map((t) => t.split('/')[1]).join(', ')}`,
        })
        return false
    }
}
// function beforeAvatarUpload2(rawFile: UploadRawFile) {
//     console.log(rawFile)
// }
// 取消
function cancelHandle() {
    dialogVisible.value = false
}
// 确定
function confirmHandle() {
    tradeMarkRef.value.validate(async (valid: boolean) => {
        if (valid) {
            const isModify = !!form.id
            const successMessage = `${isModify ? '修改' : '添加'}成功`
            const errorMessage = `${isModify ? '修改' : '添加'}失败`
            try {
                const res = await reqAddOrUpdateTradeMark(form)
                if (res.code === 200) {
                    dialogVisible.value = false
                    ElMessage({
                        type: 'success',
                        message: successMessage,
                    })
                    await getHasTradeMark()
                } else {
                    ElMessage({
                        type: 'error',
                        message: errorMessage,
                    })
                    dialogVisible.value = false
                }
            } catch (e) {
                ElMessage({
                    type: 'error',
                    message: errorMessage,
                })
                console.log(e)
            }
        }
    })
    // dialogVisible.value = false
}
// 添加品牌
function addHandle() {
    form.logoUrl = ''
    form.tmName = ''
    delete form.id
    imageUrl.value = ''
    dialogVisible.value = true
    dialogTitle.value = '添加品牌'
    clearValidateMessage()
}
// 清空校验信息
const clearValidateMessage = () => {
    tradeMarkRef.value?.clearValidate('tmName')
    tradeMarkRef.value?.clearValidate('logoUrl')
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
    :deep(.el-upload) {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        transition: var(--el-transition-duration-fast);

        &:hover {
            border-color: var(--el-color-primary);
        }
    }
}

.el-icon.avatar-uploader-icon {
    width: 178px;
    height: 178px;
    font-size: 28px;
    color: #8c939d;
    text-align: center;
}
</style>
