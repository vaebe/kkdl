import { cloneDeep } from 'lodash-es'
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
export function usePageList<T>(opts: PageOptions<T>) {
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

  const listLoading = ref(false)
  const tableData = ref<any[]>([])

  async function getList() {
    listLoading.value = true

    const params = {
      ...page,
      ...searchForm,
      ...customQueryParameters(),
    }

    try {
      const res = await getListApi(params)
      if (res.code === 0) {
        const { list = [], total = 0 } = res.data || {}
        tableData.value = list
        page.total = total

        getListFunc(opts)
      }
      else {
        tableData.value = []
        page.total = 0
      }
    }
    catch {
      tableData.value = []
      page.total = 0
    }
    finally {
      listLoading.value = false
    }
  }

  function handleSizeChange(size: number) {
    page.pageSize = size
    sizeChangeFunc()
    getList()
  }

  function handleCurrentChange(cur: number) {
    page.pageNo = cur
    currentChangeFunc()
    getList()
  }

  function reset() {
    Object.assign(searchForm, resetObjToPrimitiveType(searchForm))
    resetFunc()
    handleCurrentChange(1)
  }

  function removeRow(params: any, infoText = '此操作将永久删除该数据, 是否继续?', delSuccessInfo = '删除成功') {
    if (!removeRowApi) {
      ElMessage.warning('请配置 removeRowApi 调用')
      return
    }

    ElMessageBox.confirm(infoText, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(async () => {
        const res = await removeRowApi(params)
        if (res?.code === 0) {
          ElMessage.success(delSuccessInfo)
          handleCurrentChange(1)
        }
      })
      .catch(() => {})
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
export function usePageListDialog(opts: PageListDialogOpts) {
  const { saveForm = {}, openDialogFunc, saveApi, updateApi, saveSuccessFunc, beforeSaveFunc } = opts

  const dialogType = ref<DialogType>('add')
  const dialogTypeObj: Record<DialogType, string> = {
    add: '新增',
    edit: '编辑',
    view: '查看',
  }

  const dialogTitle = computed(() => dialogTypeObj[dialogType.value])

  const dialogIsView = computed(() => dialogType.value === 'view')
  const dialogVisible = ref(false)
  const dialogFormRef = ref<FormInstance>()

  async function openDialog(type: DialogType = 'add', data?: AnyObject) {
    if (type !== 'add' && !data) {
      console.error('openDialog 函数type类型不等于 add 时 data 必传')
      return
    }

    dialogType.value = type
    Object.assign(saveForm, type === 'add' ? resetObjToPrimitiveType(saveForm) : cloneDeep(data))
    dialogVisible.value = true

    await nextTick()

    dialogFormRef.value?.clearValidate()
    openDialogFunc?.(cloneDeep(data ?? {}))
  }

  function save() {
    dialogFormRef.value?.validate(async (valid): Promise<void> => {
      if (!valid) {
        ElMessage.warning('信息不完整，请检查必填项内容！')
        return
      }

      if (beforeSaveFunc && !(await beforeSaveFunc()))
        return

      const opts = cloneDeep(saveForm)
      const api = dialogType.value === 'add' ? saveApi : updateApi
      const res = await api?.(opts)

      if (res?.code === 0) {
        saveSuccessFunc?.()
        ElMessage.success('操作成功')
        dialogVisible.value = false
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
