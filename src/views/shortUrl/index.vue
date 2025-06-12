<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import {
  batchExportShortUrl,
  batchImportShortUrl,
  deleteShortUrl,
  getShortUrlList,
  templateDownloadShortUrl,
} from '@/api/shortUrl.ts'

const AddDialog = defineAsyncComponent(
  () => import('./components/AddDialog.vue'),
)

const searchForm = reactive({
  title: '',
  rawUrl: '',
})

const { reset, page, tableData, handleCurrentChange, removeRow } = usePageList({
  searchForm,
  getListApi: getShortUrlList,
  removeRowApi: deleteShortUrl,
})
reset()

const { VITE_APP_BASE_URL } = import.meta.env
function getRowShortUrl(url: string): string {
  return VITE_APP_BASE_URL?.replace('api', url)
}

const { copy, isSupported } = useClipboard()

function copyText(str: string) {
  if (!isSupported) {
    ElMessage.warning('不支持一键复制!')
    return
  }

  copy(str)

  ElMessage.success(`复制成功: ${str}`)
}

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
  await downloadStreamingFile({ data: res, name: '短链管理导入模版', type: '.xlsx' })
  ElMessage.success('导入模版下载成功!')
}

async function batchExport() {
  const res = await batchExportShortUrl(searchForm)
  await downloadStreamingFile({ data: res, name: '短链管理', type: '.xlsx' })
  ElMessage.success('导出成功!')
}
</script>

<template>
  <el-card class="mb-2" :body-style="{ paddingBottom: '2px' }">
    <el-form :model="searchForm" label-position="top">
      <el-row :gutter="10" align="middle">
        <el-col :span="8">
          <el-form-item label="短链名称：">
            <el-input v-model="searchForm.title" placeholder="请输入短链名称" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="跳转链接：">
            <el-input v-model="searchForm.rawUrl" placeholder="请输入跳转链接" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-row type="flex" justify="end">
            <el-button @click="reset">
              重置
            </el-button>
            <el-button type="primary" @click="handleCurrentChange(1)">
              查询
            </el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
  </el-card>

  <el-card>
    <div class="flex items-center justify-between">
      <span class="page-title">{{ $route.meta.title }}</span>

      <el-button-group class="ml-4">
        <el-button type="primary" @click="open()">
          批量导入
        </el-button>
        <el-button @click="templateDownload">
          导入模版下载
        </el-button>
        <el-button @click="batchExport">
          批量导出
        </el-button>
        <el-button @click="addShortUrl">
          新增
        </el-button>
      </el-button-group>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" class="my-2">
      <el-table-column type="index" label="序号" width="60" fixed="left" />
      <el-table-column label="短链名称" prop="title" min-width="200" />
      <el-table-column label="短链" prop="shortUrl" min-width="260">
        <template #default="scope">
          <div class="flex items-center justify-between">
            <el-link type="primary" target="_blank" :href="getRowShortUrl(scope.row.shortUrl)">
              {{ getRowShortUrl(scope.row.shortUrl) }}
            </el-link>
            <Icon
              width="20" height="20"
              icon="ph:copy-bold"
              class="ml-2 cursor-pointer hover:text-blue-500"
              @click="copyText(getRowShortUrl(scope.row.shortUrl))"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="跳转链接" prop="rawUrl" min-width="300" />
      <el-table-column label="创建时间" prop="createdAt" min-width="180" />
      <el-table-column label="过期时间" prop="expirationTime" min-width="180" />
      <el-table-column label="操作" width="70" fixed="right">
        <template #default="scope">
          <el-button type="danger" link @click="removeRow({ id: scope.row.id })">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      hide-on-single-page
      :current-page="page.pageNo"
      :page-size="page.pageSize"
      layout="total,prev, pager, next,jumper"
      :total="page.total"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <AddDialog ref="addDialogRef" @refresh-data="reset" />
</template>

<style lang="scss" scoped></style>
