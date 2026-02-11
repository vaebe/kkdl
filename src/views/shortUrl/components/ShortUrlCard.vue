<script lang="ts" setup>
import type { ShortUrlInfo } from '@/api/shortUrl'
import { Icon } from '@iconify/vue'

const props = defineProps<{ item: ShortUrlInfo }>()

const CardBox = defineAsyncComponent(() => import('@/components/CardBox.vue'))

const { VITE_APP_BASE_URL } = import.meta.env
const rowShortUrl = computed(() => VITE_APP_BASE_URL?.replace('/api', `/${props.item.shortUrl}`))

const { copy, isSupported } = useClipboard()

function copyText() {
  if (!isSupported) {
    ElMessage.warning('不支持一键复制!')
    return
  }

  copy(rowShortUrl.value)

  ElMessage.success(`复制成功: ${rowShortUrl.value}`)
}
</script>

<template>
  <CardBox class="relative flex h-full flex-col justify-between">
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
            :href="rowShortUrl"
            class="max-w-full truncate text-xs"
          >
            {{ item.shortUrl }}
          </el-link>
          <el-tooltip content="复制短链" placement="top">
            <button
              type="button"
              class="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-(--el-color-primary) transition-colors hover:bg-(--el-color-primary-light-9)"
              aria-label="复制短链地址"
              @click="copyText"
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

      <!-- 删除按钮的位置 -->
      <slot name="delBut" />
    </footer>
  </CardBox>
</template>
