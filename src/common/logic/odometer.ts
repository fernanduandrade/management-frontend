import { Ref } from 'vue'

export const useOdometer = (startValue: Ref<number>, targetValue: number, duration: number) => {
  const initialValue = startValue.value
  const totalFrames = Math.ceil(duration / 50)
  const increment = (targetValue - initialValue) / totalFrames

  let frameCount = 0

  const updateOdometer = () => {
    const currentValue = startValue.value
    if (frameCount < totalFrames && currentValue < targetValue) {
      startValue.value = Math.floor(currentValue + increment)
      frameCount++
      setTimeout(updateOdometer, 50)
    }
    else {
      startValue.value = targetValue
    }
  }

  updateOdometer()
}
