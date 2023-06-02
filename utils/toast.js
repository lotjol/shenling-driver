export const toast = (title = '数据加载失败...') => {
  uni.showToast({ title, mask: true, icon: 'none' })
}
