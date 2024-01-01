import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

import useUserStore from './modules/useUserStore';

const pinia = createPinia();
pinia.use(piniaPersist);

// 这里统一导出使用
export { useUserStore };
export default pinia;
