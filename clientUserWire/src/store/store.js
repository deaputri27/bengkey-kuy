import { create } from 'zustand'

const useStore = create((set) => ({
  datas: [],
  userLoc: { lat: 0, lng: 0 },
  partnerId: 0,
  dataProduct: [],
  dataOrder: { id: 0, status: '' },
  updateOrder: (dataOrder) => set(() => ({ dataOrder: dataOrder })),
  updateDatas: (datas) => set(() => ({ datas: datas })),
  updateDataProduct: (dataProduct) => set(() => ({ dataProduct: dataProduct })),
  updateUserLoc: (userLoc) => set(() => ({ userLoc: userLoc })),
  updatePartnerId: (partnerId) => set(() => ({ partnerId: partnerId }))
}))

export default useStore