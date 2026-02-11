<script lang="ts" setup>
import { batchExportShortUrl, batchImportShortUrl, deleteShortUrl, getShortUrlList, templateDownloadShortUrl } from '@/api/shortUrl.ts'

import ShortUrlList from './components/ShortUrlList.vue'

const AddDialog = defineAsyncComponent(() => import('./components/AddDialog.vue'))
const CardBox = defineAsyncComponent(() => import('@/components/CardBox.vue'))

const searchForm = reactive({
  title: '',
  rawUrl: '',
})

const { reset, page, tableData, handleCurrentChange, removeRow, listLoading } = usePageList({
  searchForm,
  getListApi: getShortUrlList,
  removeRowApi: deleteShortUrl,
})
reset()

const { open, reset: onSelectFileReset, onChange: onSelectFileChange } = useFileDialog({
  accept: '.xlsx',
  directory: false,
  multiple: false,
  reset: true,
})

const addDialogRef = ref()
function addShortUrl() {
  addDialogRef.value.openDialog()
}

onSelectFileChange((files) => {
  if (files && files?.length !== 0) {
    const formData = new FormData()
    formData.append('file', files[0])

    batchImportShortUrl(formData).then(() => {
      ElMessage.success('导入成功')
      reset()
    })
  }

  onSelectFileReset()
})

const { downloadStreamingFile } = useFileDownload()

async function templateDownload() {
  const res = await templateDownloadShortUrl()
  downloadStreamingFile({ data: res, name: '短链管理导入模版', type: '.xlsx' })
  ElMessage.success('导入模版下载成功!')
}

async function batchExport() {
  const res = await batchExportShortUrl(searchForm)
  downloadStreamingFile({ data: res, name: '短链管理', type: '.xlsx' })
  ElMessage.success('导出短链列表成功!')
}
</script>

<template>
  <div>
    <CardBox class="mb-4">
      <header class="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 class="m-0 text-lg font-semibold text-(--el-text-color-primary)">
            {{ $route.meta.title }}
          </h2>
          <p class="m-0 text-xs text-(--el-text-color-secondary)">
            管理你的短链，支持搜索、导入导出与快速复制。
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-end gap-2 md:justify-end">
          <el-button-group>
            <el-button @click="open()">
              批量导入
            </el-button>
            <el-button @click="templateDownload">
              导入模版下载
            </el-button>
            <el-button @click="batchExport">
              批量导出
            </el-button>
          </el-button-group>
          <el-button type="primary" class="min-w-24" @click="addShortUrl">
            新增
          </el-button>
        </div>
      </header>

      <el-form :model="searchForm" label-position="top" class="mt-1">
        <el-row :gutter="16" align="middle">
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="短链名称">
              <el-input
                v-model="searchForm.title"
                placeholder="例如：活动落地页、双11推广…"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8">
            <el-form-item label="跳转链接">
              <el-input
                v-model="searchForm.rawUrl"
                placeholder="支持模糊搜索完整链接或主域名…"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <div class="mt-1 flex justify-end gap-2 md:mt-2">
              <el-button @click="reset">
                重置
              </el-button>
              <el-button type="primary" @click="handleCurrentChange(1)">
                查询
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </CardBox>

    <!-- 列表区（拆分为子组件） -->
    <ShortUrlList
      :items="tableData"
      :loading="listLoading"
      :page="page"
      @page-change="handleCurrentChange"
      @delete="removeRow"
    />

    <AddDialog ref="addDialogRef" @refresh-data="reset" />
  </div>
</template>
