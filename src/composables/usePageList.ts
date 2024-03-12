import { computed, nextTick, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { ElMessageBox } from 'element-plus'
import type { FormInstance } from 'element-plus'
import type { ResultData } from '@/api/base'
import type { AnyObject, PaginationParameter } from '@/types'
import { resetObjToPrimitiveType } from '@/utils/tool'

interface PageOptions<T> {
  searchForm?: AnyObject
  getListApi: (params: any) => Promise<AnyObject>
  removeRowApi?: (params: any) => Promise<AnyObject>
  customQueryParameters?: () => Record<string, any>
  getListFunc?: (opts: PageOptions<T>) => void
  resetFunc?: () => void
  sizeChangeFunc?: () => void
  currentChangeFunc?: () => void
}

// 列表
export function usePageList<T>(opts: PageOptions<T>): {
  listLoading: Ref<boolean>
  reset: () => void
  page: PaginationParameter
  tableData: Ref<any[]>
  handleSizeChange: (size: number) => void
  handleCurrentChange: (cur: number) => void
  removeRow: (params: any) => void
} {
  const {
    searchForm = {},
    getListApi,
    removeRowApi,
    customQueryParameters = () => ({}),
    getListFunc = () => {},
    resetFunc = () => {},
    sizeChangeFunc = () => {},
    currentChangeFunc = () => {},
  } = opts

  const page = reactive<PaginationParameter>({
    pageSize: 10,
    pageNo: 1,
    total: 0,
  })

  // 获取列表loading
  const listLoading = ref(false)

  const tableData: Ref<any[]> = ref([])

  const getList = (): void => {
    listLoading.value = true

    const params = {
      ...page,
      ...searchForm,
      ...customQueryParameters(),
    }

    getListApi(params)
      .then((res) => {
        if (res.code === 0) {
          const data = res.data || {}
          tableData.value = data?.list || []
          page.total = data?.total || 0

          getListFunc(opts)
        }
      })
      .catch(() => {
        // code -1 拦截器当错误返回
        tableData.value = []
        page.total = 0
      })
      .finally(() => {
        listLoading.value = false
      })
  }

  const handleSizeChange = (size: number): void => {
    page.pageSize = size
    sizeChangeFunc()
    getList()
  }

  const handleCurrentChange = (cur: number): void => {
    page.pageNo = cur
    currentChangeFunc()
    getList()
  }

  const reset = (): void => {
    Object.assign(searchForm, resetObjToPrimitiveType(searchForm))
    resetFunc()
    handleCurrentChange(1)
  }

  // 删除
  const removeRow = (
    params: any,
    infoText?: string,
    delSuccessInfo?: string,
  ): void => {
    if (!removeRowApi) {
      ElMessage.warning('请配置 removeRowApi 调用')
      return
    }

    ElMessageBox.confirm(
      infoText ?? '此操作将永久删除该数据, 是否继续?',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
      .then(async () => {
        const res = await removeRowApi?.(params)
        if (res?.code === 0) {
          ElMessage.success(delSuccessInfo ?? '删除成功')
          handleCurrentChange(1)
        }
      })
      .finally(() => {})
  }

  return {
    listLoading,
    reset,
    page,
    tableData,
    handleSizeChange,
    handleCurrentChange,
    removeRow,
  }
}

// 弹窗类型
export type DialogType = 'add' | 'edit' | 'view'

interface PageListDialogOpts {
  saveForm: AnyObject // 保存的数据
  openDialogFunc?: (row: AnyObject) => void // 弹窗打开的后的执行的逻辑
  saveApi?: (opts: any) => Promise<ResultData<any>> // 保存接口
  updateApi?: (opts: any) => Promise<ResultData<any>> // 编辑接口 只有新增无需传递
  beforeSaveFunc?: () => Promise<boolean> // 保存接口调用前调用返回布尔，false 则取消保存
  saveSuccessFunc?: () => void // 保存成功后执行的逻辑
}

// 列表弹窗
export function usePageListDialog(opts: PageListDialogOpts): {
  dialogType: Ref<DialogType>
  openDialog: (type: DialogType, data?: AnyObject) => void
  dialogIsView: Ref<boolean>
  dialogTitle: Ref<string>
  dialogVisible: Ref<boolean>
  dialogFormRef: Ref<FormInstance | undefined>
  save: () => void
} {
  const {
    saveForm = {},
    openDialogFunc,
    saveApi,
    updateApi,
    saveSuccessFunc,
    beforeSaveFunc,
  } = opts

  const dialogType = ref<DialogType>('add')
  const dialogTitle = computed(() => {
    const typeObj = {
      add: '新增',
      edit: '编辑',
      view: '查看',
    }
    return typeObj[dialogType.value]
  })

  const dialogIsView = computed(() => {
    return dialogType.value === 'view'
  })

  const dialogVisible = ref(false)
  const dialogFormRef = ref<FormInstance>()

  const openDialog = async (
    type: DialogType = 'add',
    data?: AnyObject,
  ): Promise<void> => {
    if (type !== 'add' && !data) {
      console.error('openDialog 函数type类型不等于 add 时 data 必传')
      return
    }

    dialogType.value = type
    if (type === 'add')
      Object.assign(saveForm, resetObjToPrimitiveType(saveForm))
    else
      Object.assign(saveForm, cloneDeep(data))

    dialogVisible.value = true

    await nextTick()

    dialogFormRef.value?.clearValidate()
    openDialogFunc?.(cloneDeep(data ?? {}))
  }

  const save = (): void => {
    dialogFormRef.value?.validate(async (valid): Promise<void> => {
      if (valid) {
        // beforeSaveFunc 存在且返回 false 不继续进行
        if (beforeSaveFunc && !(await beforeSaveFunc()))
          return

        const opts = cloneDeep(saveForm)

        const res
          = dialogType.value === 'add'
            ? await saveApi?.(opts)
            : await updateApi?.(opts)

        if (res?.code === 0) {
          saveSuccessFunc?.()

          ElMessage.success('操作成功')
          dialogVisible.value = false
        }
      }
      else {
        ElMessage.warning('信息不完整，请检查必填项内容！')
      }
    })
  }

  return {
    dialogType,
    openDialog,
    dialogIsView,
    dialogTitle,
    dialogVisible,
    dialogFormRef,
    save,
  }
}
