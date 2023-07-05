import { create } from 'zustand'

const useStore = create((set) => ({
  datas: [],
  userLoc: { lat: 0, lng: 0 },
  partnerId: 0,
  updateDatas: (datas) => set(() => ({ datas: datas })),
  updateUserLoc: (userLoc) => set(() => ({ userLoc: userLoc })),
  updatePartnerId: (partnerId) => set(() => ({ partnerId: partnerId }))
}))

export default useStore