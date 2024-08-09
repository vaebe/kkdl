<script lang="ts" setup>
import { getShortUrlVisitsList } from '@/api/shortUrlVisits.ts'

const searchForm = reactive({
  code: '',
})

const { reset, page, tableData, handleCurrentChange } = usePageList({
  searchForm,
  getListApi: getShortUrlVisitsList,
})
reset()
</script>

<template>
  <el-card class="mb-2" :body-style="{ paddingBottom: '2px' }">
    <el-form :model="searchForm" label-width="90px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="短链：">
            <el-input v-model="searchForm.code" placeholder="请输入短链" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="16">
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
      <span class="text-title">{{ $route.meta.title }}</span>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" class="my-2">
      <el-table-column type="index" label="序号" width="60" fixed="left" />
      <el-table-column label="短链" prop="shortUrl" min-width="90" fixed="left" />
      <el-table-column label="跳转链接" prop="rawUrl" min-width="300" />
      <el-table-column label="ip" prop="ip" min-width="140" />
      <el-table-column label="userAgent" prop="userAgent" min-width="300" />
      <el-table-column label="浏览器名称" prop="browserName" min-width="140" />
      <el-table-column label="浏览器版本" prop="browserVersion" min-width="100" />
      <el-table-column label="设备型号" prop="deviceModel" min-width="100" />
      <el-table-column label="浏览器引擎名称" prop="engineName" min-width="140" />
      <el-table-column label="浏览器引擎版本" prop="engineVersion" min-width="140" />
      <el-table-column label="操作系统名称" prop="osName" min-width="140" />
      <el-table-column label="操作系统版本" prop="osVersion" min-width="140" />
      <el-table-column label="ip" prop="ip" min-width="140" />
      <el-table-column label="洲" prop="continent" min-width="140" />
      <el-table-column label="国家" prop="country" min-width="140" />
      <el-table-column label="市" prop="city" min-width="140" />
      <el-table-column label="纬度" prop="lat" min-width="140" />
      <el-table-column label="经度" prop="lon" min-width="140" />
      <el-table-column label="访问时间" prop="createdAt" min-width="180" />
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
</template>

<style lang="scss" scoped></style>
