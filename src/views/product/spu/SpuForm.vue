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
                <el-select
                    v-model="saleAttrIdAndValueName"
                    style="width: 200px"
                >
                    <el-option
                        v-for="item in unSelectSaleAttr"
                        :label="item.name"
                        :key="item.id"
                        :value="`${item.id}:${item.name}`"
                    ></el-option>
                </el-select>
                <el-button
                    :disabled="!saleAttrIdAndValueName"
                    class="ml-10"
                    type="primary"
                    @click="addSaleAttr"
                >
                    添加属性值
                </el-button>
            </div>
            <el-table border :data="saleAttr">
                <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="80px"
                ></el-table-column>
                <el-table-column
                    label="销售属性名字"
                    width="120px"
                    prop="saleAttrName"
                ></el-table-column>
                <el-table-column label="销售属性值">
                    <template #default="{ row }">
                        <el-tag
                            v-for="(tag, i) in row.spuSaleAttrValueList"
                            :key="tag.id"
                            closable
                            class="ml-4 mr-4"
                            @close="row.spuSaleAttrValueList.splice(i, 1)"
                        >
                            {{ tag.saleAttrValueName }}
                        </el-tag>
                        <el-input
                            v-model="row.saleAttrValue"
                            v-if="row.flag"
                            placeholder="请输入"
                            size="small"
                            style="width: 120px"
                            @blur="toLook(row)"
                        ></el-input>
                        <el-button
                            v-else
                            size="small"
                            icon="Plus"
                            class="ml-4 mr-4"
                            @click="toEdit(row)"
                        ></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #default="{ $index }">
                        <el-button
                            type="danger"
                            icon="Delete"
                            @click="saleAttr.splice($index, 1)"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="mr-10" @click="save">
                保存
            </el-button>
            <el-button type="danger" @click="$emit('changeScene', 0)">
                取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
    AllTrademark,
    HasSaleAttr,
    HasSaleAttrResponseData,
    SaleAttr,
    SaleAttrResponseData,
    SaleAttrValue,
    SpuData,
    SpuHasImg,
    SpuImage,
} from '@/api/product/spu/type.ts'
import {
    reqAllTrademark,
    reqSpuImageList,
    reqSpuHasSaleAttr,
    reqAllSaleAttr,
    reqAddOrUpdateSPU,
} from '@/api/product/spu'
import type { TradeMark } from '@/api/product/trademark/type.ts'
import { ElMessage, type UploadFile } from 'element-plus'

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
const saleAttrIdAndValueName = ref('')
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
async function initAddSpu(c3Id: number) {
    formData.value = {
        category3Id: c3Id,
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: [],
    }
    imgList.value = []
    saleAttr.value = []
    saleAttrIdAndValueName.value = ''
    const res: AllTrademark = await reqAllTrademark()
    const res4: HasSaleAttrResponseData = await reqAllSaleAttr()
    allTradeMark.value = res.data
    allSaleAttr.value = res4.data
}
const dialogVisible = ref(false)
const dialogImageUrl = ref<string | undefined>('')
function handleRemove() {}
function handlePictureCardPreview(file: UploadFile) {
    dialogVisible.value = true
    dialogImageUrl.value = file.url
}

const unSelectSaleAttr = computed(() => {
    return allSaleAttr.value.filter((o) => {
        return saleAttr.value.every((item) => item.saleAttrName !== o.name)
    })
})
function addSaleAttr() {
    const [baseSaleAttrId, saleAttrName] =
        saleAttrIdAndValueName.value.split(':')
    const sAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
    }
    saleAttr.value.push(sAttr)
    saleAttrIdAndValueName.value = ''
}
function toEdit(row: SaleAttr) {
    row.flag = true
    row.saleAttrValue = ''
}
function toLook(row: SaleAttr) {
    const { saleAttrValue, baseSaleAttrId } = row
    if (saleAttrValue?.trim() === '') {
        ElMessage({
            type: 'warning',
            message: '属性值不能为空',
        })
        return
    }
    if (
        row.spuSaleAttrValueList.find(
            (o) => o.saleAttrValueName === saleAttrValue,
        )
    ) {
        ElMessage({
            type: 'warning',
            message: '不能有重复的',
        })
        return
    }
    const item: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue,
    }
    row.spuSaleAttrValueList.push(item)
    row.flag = false
    row.saleAttrValue = ''
}
async function save() {
    formData.value.spuImageList = imgList.value.map((item) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url,
        }
    })
    formData.value.spuSaleAttrList = saleAttr.value

    const res = await reqAddOrUpdateSPU(formData.value)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: formData.value.id ? '修改成功' : '新增成功',
        })
    } else {
        ElMessage({
            type: 'error',
            message: formData.value.id ? '修改失败' : '新增失败',
        })
    }
}

defineExpose({
    getAllData,
    initAddSpu,
})
</script>

<style scoped></style>
