<script lang="ts" setup>
import type { ShortUrlInfo } from '@/api/shortUrl'
import type { PaginationParameter } from '@/types'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  items: ShortUrlInfo[]
  loading: boolean
  page: PaginationParameter
}>()

const emit = defineEmits<{
  pageChange: [page: number]
  delete: [{ id: string | number }]
}>()

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
</script>

<template>
  <div v-loading="props.loading">
    <div
      v-if="props.items.length"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <article
        v-for="(item, index) in props.items"
        :key="item.id ?? index"
        class="relative flex h-full flex-col justify-between rounded-xl bg-(--el-bg-color-overlay) p-3 shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-lg"
        aria-label="短链卡片"
      >
        <header class="mb-2 flex items-start justify-between gap-2">
          <div class="min-w-0">
            <h3
              class="truncate text-sm font-semibold text-(--el-text-color-primary)"
              :title="item.title || '未命名短链'"
            >
              {{ item.title || '未命名短链' }}
            </h3>
            <p
              class="mt-0.5 line-clamp-2 break-all text-xs text-(--el-text-color-secondary)"
              :title="item.rawUrl"
            >
              {{ item.rawUrl }}
            </p>
          </div>
          <el-tag size="small" type="success">
            短链
          </el-tag>
        </header>

        <section class="mb-2 flex flex-col gap-2 text-xs text-(--el-text-color-regular)">
          <div class="flex items-center gap-2">
            <span class="shrink-0 text-[11px] text-(--el-text-color-placeholder)">
              短链
            </span>
            <div class="flex min-w-0 items-center gap-1">
              <el-link
                type="primary"
                target="_blank"
                :href="getRowShortUrl(item.shortUrl)"
                class="max-w-full truncate text-xs"
              >
                {{ item.shortUrl }}
              </el-link>
              <el-tooltip content="复制短链" placement="top">
                <button
                  type="button"
                  class="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-(--el-color-primary) transition-colors hover:bg-(--el-color-primary-light-9)"
                  aria-label="复制短链地址"
                  @click="copyText(getRowShortUrl(item.shortUrl))"
                >
                  <Icon
                    width="16"
                    height="16"
                    icon="ph:copy-bold"
                    aria-hidden="true"
                  />
                </button>
              </el-tooltip>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-x-3 gap-y-1">
            <div class="flex flex-col gap-0.5">
              <span class="text-[11px] text-(--el-text-color-placeholder)">
                创建时间
              </span>
              <span class="text-xs text-(--el-text-color-regular)">
                {{ item.createdAt || '-' }}
              </span>
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[11px] text-(--el-text-color-placeholder)">
                过期时间
              </span>
              <span class="text-xs text-(--el-text-color-regular)">
                {{ item.expirationTime || '永久' }}
              </span>
            </div>
          </div>
        </section>

        <footer class="mt-1 flex items-center justify-between border-t border-(--el-border-color-lighter) pt-2 text-[11px] text-(--el-text-color-placeholder)">
          <span class="max-w-30 truncate">
            ID: {{ item.id }}
          </span>

          <el-button type="danger" size="small" link @click=" emit('delete', { id: item.id })">
            删除
          </el-button>
        </footer>
      </article>
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
