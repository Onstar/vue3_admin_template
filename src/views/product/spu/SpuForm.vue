<template>
    <el-form label-width="110px">
        <el-form-item label="SPU名称">
            <el-input
                placeholder="请输入SPU名称"
                v-model="formData.spuName"
            ></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="formData.tmId">
                <el-option
                    v-for="item in allTradeMark"
                    :label="item.tmName"
                    :key="item.id"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input
                v-model="formData.description"
                type="textarea"
                placeholder="请输入SPU描述"
            ></el-input>
        </el-form-item>
        <el-form-item label="SPU图片">
            <el-upload
                v-model:file-list="imgList"
                action="/api/admin/product/fileUpload"
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
import type {
    AllTrademark,
    HasSaleAttr,
    HasSaleAttrResponseData,
    SaleAttr,
    SaleAttrResponseData,
    SpuData,
    SpuHasImg,
    SpuImage,
} from '@/api/product/spu/type.ts'
import {
    reqAllTrademark,
    reqSpuImageList,
    reqSpuHasSaleAttr,
    reqAllSaleAttr,
} from '@/api/product/spu'
import type { TradeMark } from '@/api/product/trademark/type.ts'
import type { UploadFile } from 'element-plus'

defineOptions({
    name: 'SpuForm',
})
defineEmits<{
    (e: 'changeScene', v: number): void
}>()
/******************** 接口请求 ********************/

const formData = ref<SpuData>({
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
})
const allTradeMark = ref<TradeMark[]>([])
const imgList = ref<SpuImage[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
// 发送获取数据请求
async function getAllData(spuData: SpuData) {
    formData.value = spuData
    const res: AllTrademark = await reqAllTrademark()
    const res2: SpuHasImg = await reqSpuImageList(spuData.id as number)
    const res3: SaleAttrResponseData = await reqSpuHasSaleAttr(
        spuData.id as number,
    )
    const res4: HasSaleAttrResponseData = await reqAllSaleAttr()
    allTradeMark.value = res.data
    imgList.value = res2.data.map((item) => {
        return {
            ...item,
            name: item.imgName,
            url: item.imgUrl,
        }
    })
    saleAttr.value = res3.data
    allSaleAttr.value = res4.data
}
const dialogVisible = ref(false)
const dialogImageUrl = ref<string | undefined>('')
function handleRemove() {}
function handlePictureCardPreview(file: UploadFile) {
    dialogVisible.value = true
    dialogImageUrl.value = file.url
}
defineExpose({
    getAllData,
})
</script>

<style scoped></style>
