<script lang="ts" setup>
import { reactive } from 'vue';
import {
  getShortURLList,
  deleteShortURL,
  batchExportShortURL,
  templateDownloadShortURL
} from '@/api/shortURL.ts';
import { usePageList, useFileDownload } from '@/composables';

const { VITE_APP_BASE_URL } = import.meta.env;

const searchForm = reactive({
  title: '',
  rawUrl: ''
});

const { reset, page, tableData, handleCurrentChange, removeRow } = usePageList({
  searchForm,
  getListApi: getShortURLList,
  removeRowApi: deleteShortURL
});
reset();

const { downloadStreamingFile } = useFileDownload();

const templateDownload = async () => {
  const res = await templateDownloadShortURL(searchForm);
  await downloadStreamingFile({
    data: res,
    name: '短链管理导入模版',
    type: '.xlsx'
  });
  ElMessage.success('导入模版下载成功!');
};

const batchExport = async () => {
  const res = await batchExportShortURL(searchForm);
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
          <el-button type="primary">批量导入</el-button>
          <el-button @click="templateDownload">导入模版下载</el-button>
          <el-button @click="batchExport">批量导出</el-button>
          <el-button>新增</el-button>
        </el-button-group>
      </div>

      <el-table :data="tableData" stripe style="width: 100%" class="my-2">
        <el-table-column type="index" label="序号" width="90"></el-table-column>
        <el-table-column label="短链名称" prop="title"></el-table-column>
        <el-table-column label="短链" prop="shortUrl">
          <template #default="scope">
            {{ VITE_APP_BASE_URL?.replace('api', scope.row.shortUrl) }}
          </template>
        </el-table-column>
        <el-table-column label="跳转链接" prop="rawUrl"></el-table-column>
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
  </div>
</template>

<style lang="scss" scoped></style>
