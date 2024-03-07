<script lang="ts" setup>
import { reactive, defineAsyncComponent, ref, onMounted } from 'vue';
import {
  getShortUrlList,
  deleteShortUrl,
  batchExportShortUrl,
  templateDownloadShortUrl,
  batchImportShortUrl
} from '@/api/shortUrl.ts';
import { usePageList, useFileDownload } from '@/composables';
import { useFileDialog } from '@vueuse/core';
import ClipboardJS from 'clipboard';

const AddDialog = defineAsyncComponent(
  () => import('./components/AddDialog.vue')
);

const searchForm = reactive({
  title: '',
  rawUrl: ''
});

const { reset, page, tableData, handleCurrentChange, removeRow } = usePageList({
  searchForm,
  getListApi: getShortUrlList,
  removeRowApi: deleteShortUrl
});
reset();

const { VITE_APP_BASE_URL } = import.meta.env;
const getRowShortUrl = (url: string): string =>
  VITE_APP_BASE_URL?.replace('api', url);

// 一键复制
const initClipboard = () => {
  const clipboard = new ClipboardJS('.clipboardBtn', {
    text: (trigger: Element) => {
      return trigger.getAttribute('data-clipboard-text') as string;
    }
  });

  clipboard.on('success', (e) => {
    ElMessage.success('复制成功！');
    e.clearSelection();
  });

  clipboard.on('error', (e) => {
    // 数据存在，复制失败进行提示！
    if (e.text) ElMessage.warning('复制失败！');
    else ElMessage.warning('需要复制的数据为空！');
  });
};

onMounted(() => {
  initClipboard();
});

const {
  open,
  reset: onSelectFileReset,
  onChange: onSelectFileChange
} = useFileDialog({
  accept: '.xlsx',
  directory: false,
  multiple: false
});

const addDialogRef = ref();
const addShortUrl = () => {
  addDialogRef.value.openDialog();
};

onSelectFileChange((files) => {
  if (files && files?.length !== 0) {
    const formData = new FormData();
    formData.append('file', files[0]);

    batchImportShortUrl(formData).then(() => {
      ElMessage.success('导入成功');
      reset();
    });
  }

  onSelectFileReset();
});

const { downloadStreamingFile } = useFileDownload();

const templateDownload = async () => {
  const res = await templateDownloadShortUrl();
  await downloadStreamingFile({
    data: res,
    name: '短链管理导入模版',
    type: '.xlsx'
  });
  ElMessage.success('导入模版下载成功!');
};

const batchExport = async () => {
  const res = await batchExportShortUrl(searchForm);
  await downloadStreamingFile({ data: res, name: '短链管理', type: '.xlsx' });
  ElMessage.success('导出成功!');
};
</script>

<template>
  <div>
    <el-card class="mb-2">
      <el-form :model="searchForm" label-width="90px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="短链名称：">
              <el-input
                v-model="searchForm.title"
                placeholder="请输入短链名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="跳转链接：">
              <el-input
                v-model="searchForm.rawUrl"
                placeholder="请输入跳转链接"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-row type="flex" justify="end">
              <el-button @click="reset">重置</el-button>
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
        <span class="text-title">{{ $route.meta.title }}</span>

        <el-button-group class="ml-4">
          <el-button type="primary" @click="open">批量导入</el-button>
          <el-button @click="templateDownload">导入模版下载</el-button>
          <el-button @click="batchExport">批量导出</el-button>
          <el-button @click="addShortUrl">新增</el-button>
        </el-button-group>
      </div>

      <el-table :data="tableData" stripe style="width: 100%" class="my-2">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column
          label="短链名称"
          prop="title"
          width="200"
        ></el-table-column>
        <el-table-column label="短链" prop="shortUrl" width="240">
          <template #default="scope">
            <p
              class="clipboardBtn text-blue-400 cursor-pointer"
              :data-clipboard-text="getRowShortUrl(scope.row.shortUrl)"
            >
              {{ getRowShortUrl(scope.row.shortUrl) }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="跳转链接"
          prop="rawUrl"
          width="300"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          prop="createdAt"
          width="180"
        ></el-table-column>
        <el-table-column
          label="过期时间"
          prop="expirationTime"
          width="180"
        ></el-table-column>
        <el-table-column label="操作" width="70" fixed="right">
          <template #default="scope">
            <el-button
              type="danger"
              link
              @click="removeRow({ id: scope.row.id })"
            >
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
      ></el-pagination>
    </el-card>

    <add-dialog ref="addDialogRef" @refresh-data="reset"></add-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
