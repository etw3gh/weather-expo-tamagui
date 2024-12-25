import { Text, View } from 'tamagui'
import { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { WeatherSliceState, getWeather } from 'app/store/weatherSlice'
import { RootState } from 'app/store'

export default function TabTwoScreen() {
  const dispatch = useDispatch()

  const weather = useSelector((s: RootState) => s.weather)

  useEffect(() => {
    const loc = {
      lat: '46.3661',
      lng: '79.9296',
    }
    dispatch(getWeather(loc))
  }, [dispatch])

  console.log(weather)

  return (
    <View flex={1} alignItems="center" justifyContent="center" bg="$background">
      <Text fontSize={20} color="$blue10">
        Tab Two
      </Text>
    </View>
  )
}
