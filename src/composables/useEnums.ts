export interface EnumsItem {
  code: string;
  name: string;
}

interface UseEnumsRes {
  roleEnums: EnumsItem[];
  accountTypeEnums: EnumsItem[];
}

export const useEnums = (): UseEnumsRes => {
  const roleEnums = [
    {
      code: '01',
      name: '管理员'
    },
    {
      code: '02',
      name: '普通用户'
    },
    {
      code: '03',
      name: 'VIP'
    }
  ];

  const accountTypeEnums = [
    {
      code: '01',
      name: '邮箱注册'
    },
    {
      code: '02',
      name: '微信注册'
    }
  ];

  return {
    roleEnums,
    accountTypeEnums
  };
};
