<script lang="ts" setup>
import { reactive } from 'vue'
import {
  getShortUrlVisitsList,
} from '@/api/shortUrlVisits.ts'
import { usePageList } from '@/composables'

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
  <div>
    <el-card class="mb-2">
      <el-form :model="searchForm" label-width="90px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="短链：">
              <el-input
                v-model="searchForm.code"
                placeholder="请输入短链"
              />
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
        <el-table-column label="ip" prop="ip" min-width="100" />
        <el-table-column label="userAgent" prop="userAgent" min-width="300" />
        <el-table-column label="客户端浏览器信息" prop="secChUa" min-width="300" />
        <el-table-column label="是否来自移动设备" prop="secChUaMobile" min-width="200" />
        <el-table-column label="客户端平台" prop="secChUaPlatform" min-width="100" />
        <el-table-column label="secFetchUser" prop="secFetchUser" min-width="140" />
        <el-table-column label="创建时间" prop="createdAt" min-width="180" />
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
  </div>
</template>

<style lang="scss" scoped></style>
