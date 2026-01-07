<template>
    <div>
        <CategorySelect :scene="scene" />
        <el-card>
            <div v-show="scene === 0">
                <el-button
                    type="primary"
                    icon="Plus"
                    class="mb-10"
                    :disabled="!categoryStore.c3Id"
                    @click="addSpuHandle"
                >
                    添加SPU
                </el-button>
                <el-table border class="mb-10" :data="tableData">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80px"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        label="SPU名称"
                        prop="spuName"
                    ></el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #default="{ row }">
                            <el-button
                                type="primary"
                                icon="Plus"
                                title="添加SKU"
                            ></el-button>
                            <el-button
                                type="primary"
                                icon="Edit"
                                title="修改SPU"
                                @click="editSpuHandle(row)"
                            ></el-button>
                            <el-button
                                type="primary"
                                icon="View"
                                title="查看SKU"
                            ></el-button>
                            <el-button
                                type="primary"
                                icon="Delete"
                                title="删除SKU"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 10]"
                    size="small"
                    layout="prev, pager, next, jumper, ->, sizes,total"
                    :total="totalPages"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
            <SpuForm
                ref="spuForm"
                v-show="scene === 1"
                @changeScene="changeSceneHandle"
            />
            <SkuForm v-show="scene === 2" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'SpuIndex',
})
import { ref, watch } from 'vue'
import { reqHasSpu } from '@/api/product/spu'
import type { Records, SpuData } from '@/api/product/spu/type.ts'
import SpuForm from '@/views/product/spu/SpuForm.vue'
import SkuForm from '@/views/product/spu/SkuForm.vue'

const scene = ref(0) // 0: 显示已有spu；1:添加/修改spu；2:添加 sku
const spuForm = ref()
/******************** 分页 ********************/
const currentPage = ref(0)
const pageSize = ref(10)
const totalPages = ref(0)
const handleSizeChange = () => {
    getHasSpu()
}
const handleCurrentChange = (page) => {
    getHasSpu(page)
}
/******************** 仓库 ********************/
import useCategoryStore from '@/store/modules/category.ts'
const categoryStore = useCategoryStore()
watch(
    () => categoryStore.c3Id,
    (val) => {
        if (val) {
            getHasSpu()
        }
    },
)
/******************** 列表 ********************/
const tableData = ref<Records>([])
const getHasSpu = async (page: number = 1) => {
    currentPage.value = page
    try {
        const res = await reqHasSpu(
            currentPage.value,
            pageSize.value,
            categoryStore.c3Id,
        )
        if (res.code === 200) {
            const { total, records } = res.data || {}
            tableData.value = records
            totalPages.value = total || 0
        }
    } catch (e) {
        console.log(e)
    }
}
function addSpuHandle() {
    scene.value = 1
    spuForm.value.initAddSpu(categoryStore.c3Id)
}
function editSpuHandle(row: SpuData) {
    scene.value = 1
    spuForm.value.getAllData(row)
}
function changeSceneHandle(v: number) {
    scene.value = v
    getHasSpu()
}
</script>

<style scoped></style>
