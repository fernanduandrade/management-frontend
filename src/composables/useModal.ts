import { defineStore } from 'pinia'
import { extend } from '@vue/shared'

const component = extend({})

type VueComponent = InstanceType<typeof component>

interface IModalProps {
  component: null | VueComponent
  props?: object
  title?: string
  description?: string
  opened?: boolean
}

interface IModalState {
  modalState: IModalProps
  modalEmitValue: unknown
}

const basicState = { component: null, title: '', description: '', props: { }, opened: false }

export default defineStore('modal-store', {
  state: (): IModalState => ({ modalState: basicState, modalEmitValue: null }),
  actions: {
    openModal(payload: IModalProps) {
      const { props, component, title, description } = payload
      this.modalState = { component, props: props || {}, title, description, opened: true }
    },
    closeModal() {
      this.modalState = basicState
    },
    setFormValue(value: unknown) {
      this.modalEmitValue = value
    },
  },
})
