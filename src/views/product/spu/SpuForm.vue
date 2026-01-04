<template>
    <el-form label-width="110px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="华为2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="fileList"
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU的销售属性">
            <div style="display: flex; align-items: center" class="mb-10">
                <el-select style="width: 200px">
                    <el-option label="111"></el-option>
                </el-select>
                <el-button class="ml-10" type="primary">添加属性值</el-button>
            </div>
            <el-table border>
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="80px"
                ></el-table-column>
                <el-table-column
                    label="销售属性名字"
                    width="120px"
                ></el-table-column>
                <el-table-column label="销售属性值"></el-table-column>
                <el-table-column label="操作" width="120px"></el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="mr-10">保存</el-button>
            <el-button type="danger" @click="$emit('changeScene', 0)">
                取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SpuData } from '@/api/product/spu/type.ts'

defineOptions({
    name: 'SpuForm',
})
defineEmits<{
    (e: 'changeScene', v: number): void
}>()
/******************** 接口请求 ********************/

const spuId = ref(0)
const formData = ref({})
// 发送获取数据请求
function getAllData(spuData: SpuData) {
    formData.value = { ...spuData }
}
defineExpose({
    getAllData,
})
</script>

<style scoped></style>
