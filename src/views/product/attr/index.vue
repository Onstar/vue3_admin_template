<template>
    <div>
        <CategorySelect :scene="scene" />
        <el-card>
            <div v-show="scene === 0">
                <el-button
                    type="primary"
                    icon="Plus"
                    :disabled="!categoryStore.c3Id"
                    @click="changeScene"
                >
                    添加属性
                </el-button>
                <el-table class="mt-10 mb-10" border :data="tableData">
                    <el-table-column
                        label="序号"
                        type="index"
                        align="center"
                        width="80px"
                    ></el-table-column>
                    <el-table-column
                        label="属性名称"
                        width="120px"
                        prop="attrName"
                    ></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="{ row }">
                            <el-tag
                                style="margin: 5px"
                                :key="item.id"
                                v-for="item in row.attrValueList"
                            >
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #default="{ row }">
                            <el-button
                                type="primary"
                                size="small"
                                icon="Edit"
                            ></el-button>
                            <el-button
                                type="danger"
                                size="small"
                                icon="Delete"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene === 1">
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus">
                    添加属性
                </el-button>
                <el-button type="primary" size="default" @click="cancelHandle">
                    取消
                </el-button>
                <el-table class="mt-10 mb-10" border :data="tableData">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80px"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary">保存</el-button>
                <el-button type="primary" @click="cancelHandle">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AttrIndex',
})
import { watch, ref } from 'vue'
import { reqAttr } from '@/api/product/attr'
import type { AttrList } from '@/api/product/attr/type.ts'
import useCategoryStore from '@/store/modules/category.ts'
const categoryStore = useCategoryStore()
const scene = ref(1) // 0: 显示 table, 1: 显示属性修改
function changeScene() {
    scene.value = 1
}
function cancelHandle() {
    scene.value = 0
}
const tableData = ref<AttrList>([])
watch(
    () => categoryStore.c3Id,
    (val) => {
        if (val) {
            getAttr()
        } else {
            tableData.value = []
        }
    },
)
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    const res = await reqAttr(c1Id, c2Id, c3Id)
    if (res.code === 200) {
        tableData.value = res.data || []
    } else {
        tableData.value = []
    }
}
</script>

<style scoped></style>
