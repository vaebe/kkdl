<script lang="ts" setup>
import type { ShortUrlInfo } from '@/api/shortUrl'
import type { PaginationParameter } from '@/types'

const props = defineProps<{
  items: ShortUrlInfo[]
  loading: boolean
  page: PaginationParameter
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  delete: [{ id: string | number }]
}>()

const ShortUrlCard = defineAsyncComponent(() => import('./ShortUrlCard.vue'))
</script>

<template>
  <div v-loading="props.loading">
    <div
      v-if="props.items.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ShortUrlCard
        v-for="(item, index) in props.items"
        :key="item.id ?? index"
        :item="item"
      >
        <template #delBut>
          <el-button type="danger" size="small" link @click="emit('delete', { id: item.id })">
            删除
          </el-button>
        </template>
      </ShortUrlCard>
    </div>

    <el-empty
      v-else
      class="py-8"
      description="还没有创建任何短链，点击右上角「新增短链」开始使用。"
    />

    <div class="mt-4 flex justify-center">
      <el-pagination
        background
        hide-on-single-page
        :current-page="props.page.pageNo"
        :page-size="props.page.pageSize"
        layout="total,prev, pager, next,jumper"
        :total="props.page.total"
        @current-change="emit('pageChange', $event)"
      />
    </div>
  </div>
</template>
