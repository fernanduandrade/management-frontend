import { defineStore } from 'pinia'
import { extend } from '@vue/shared'

const component = extend({})

type VueComponent = InstanceType<typeof component>

interface IModalProps {
  component: null | VueComponent
  props?: object
  title?: string
  description?: string
}

interface IModalState {
  modalState: IModalProps
  modalEmitValue: unknown
}

const basicState = { component: null, title: '', description: '', props: { } }

export default defineStore('modal-store', {
  state: (): IModalState => ({ modalState: basicState, modalEmitValue: null }),
  actions: {
    openModal(payload: IModalProps) {
      const { props, component, title, description } = payload
      this.modalState = { component, props: props || {}, title, description }
    },
    closeModal() {
      this.modalState = basicState
    },
    setFormValue(value: unknown) {
      this.modalEmitValue = value
    },
  },
})
