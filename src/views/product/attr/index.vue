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
                                @click="editHandle(row)"
                            ></el-button>
                            <el-popconfirm
                                class="box-item"
                                title="确定删除?"
                                placement="top-start"
                                @confirm="deleteHandle(row.id)"
                            >
                                <template #reference>
                                    <el-button
                                        type="danger"
                                        size="small"
                                        icon="Delete"
                                    ></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene === 1">
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input
                            v-model="attrParams.attrName"
                            placeholder="请输入属性名称"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button
                    :disabled="!attrParams.attrName"
                    type="primary"
                    size="default"
                    icon="Plus"
                    @click="addAttrHandle"
                >
                    添加属性
                </el-button>
                <el-button type="primary" size="default" @click="cancelHandle">
                    取消
                </el-button>
                <el-table
                    class="mt-10 mb-10"
                    border
                    :data="attrParams.attrValueList"
                >
                    <el-table-column
                        type="index"
                        label="序号"
                        width="80px"
                        align="center"
                    ></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="{ row, $index }">
                            <el-input
                                :ref="
                                    (vc: HTMLInputElement) =>
                                        (elInputArr[$index] = vc)
                                "
                                v-if="row.flag"
                                v-model="row.valueName"
                                placeholder="请输入属性值名称"
                                @blur="toLook(row, $index)"
                            ></el-input>
                            <div v-else @click="toEdit(row, $index)">
                                {{ row.valueName }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #default="{ $index }">
                            <el-button
                                type="danger"
                                icon="Delete"
                                @click="deleteAttrHandle($index)"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button
                    type="primary"
                    :disabled="attrParams.attrValueList.length === 0"
                    @click="saveHandle"
                >
                    保存
                </el-button>
                <el-button type="primary" @click="cancelHandle">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

defineOptions({
    name: 'AttrIndex',
})
import { watch, ref, reactive, nextTick, onBeforeMount } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import type { AttrList, Attr, AttrValue } from '@/api/product/attr/type.ts'
import useCategoryStore from '@/store/modules/category.ts'
const categoryStore = useCategoryStore()
const scene = ref(0) // 0: 显示 table, 1: 显示属性修改
function changeScene() {
    scene.value = 1
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: '',
        categoryLevel: 3,
    })
}
function cancelHandle() {
    scene.value = 0
}
const tableData = ref<AttrList>([])
const attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
})
const elInputArr = ref<HTMLInputElement[]>([])
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
function addAttrHandle() {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,
    })
    nextTick(() => {
        const el = elInputArr.value.splice(-1, 1)[0]
        el?.focus()
    })
}
function deleteAttrHandle($index: number) {
    attrParams.attrValueList.splice($index, 1)
}
async function saveHandle() {
    attrParams.categoryId = categoryStore.c3Id
    const res = await reqAddOrUpdateAttr(attrParams)
    if (res.code === 200) {
        scene.value = 0
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '新增成功',
        })
        await getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '新增失败',
        })
    }
}
function editHandle(record: Attr) {
    scene.value = 1
    Object.assign(attrParams, JSON.parse(JSON.stringify(record)))
}
async function deleteHandle(id: number) {
    const res = await reqDeleteAttr(id)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        await getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败',
        })
    }
}
function toLook(record: AttrValue, $index: number) {
    if (record.valueName.trim() === '') {
        return
    }
    const repeat = attrParams.attrValueList.find((o) => {
        if (o !== record) {
            return o.valueName === record.valueName
        } else {
            return false
        }
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '有重复数据',
        })
        attrParams.attrValueList.splice($index, 1)
        return
    }
    record.flag = false
}
function toEdit(record: AttrValue, $index: number) {
    record.flag = true
    nextTick(() => {
        const el = elInputArr.value[$index]
        el?.focus()
    })
}
onBeforeMount(() => {
    categoryStore.$reset()
})
</script>

<style scoped></style>
