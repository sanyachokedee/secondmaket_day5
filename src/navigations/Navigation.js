import React, { useMemo, useEffect, useReducer } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import { View, ActivityIndicator } from 'react-native'

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

// import authContext
import { AuthContext } from './../store/context'
import AppNavigator from './AppNavigator'

const Navigation = () => {
  // สร้างตัวแปรแบบ State ไว้เก็บสถานะการ Loading
  // xxconst [isLoading, setIsLoading] = useState(true)

  // สร้างตัวแปร state ไว้ทดสอบ Token
  // xxconst [userToken, setUserToken] = useState(null)

  // สร้างตัวแปรแบบ initialloginState
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  // สร้าง Action สำหรับไว้ให้ Reducer เรียกทำงาน
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  }

  // กำหนดค่าลง Reducer
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  //สร้าง Action สำหรับให้

  // เรียกใช้ useEffect เพื่อเรียกทำงานฟังก์ชั่น loading
  useEffect(() => {
    setTimeout(async () => {
      loginState.isLoading = false
      let userToken
      userToken = null
      try {
        // อ่านค่าใน AsyncStorage
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      // ทำการเรียก Action RETRIEVE_TOKEN
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])
  
  // เพิ่มการใช้งาน useMemo เก็บค่าฟังก์ชั่นและตัวแปรต่างๆ ไว้เมื่อโหลด component ครั้งแรก
  const authContexValue = useMemo(
    () => ({
      signIn: async foundUser => {
        const userToken = String(foundUser[0].userToken)
        const userName = foundUser[0].username

        try {
          // เก็บข้อมูล token ลง AsyncStorage
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e)
        }

        dispatch({ type: 'LOGIN', id: userName, token: userToken })

        // setUserToken('asdf')
        // setIsLoading(false)
      },
      signUp: async () => {
        // setUserToken('abcd')
        // setIsLoading(false)
      },
      signOut: async () => {
        try {
          // เก็บข้อมูล token ลง AsyncStorage
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          console.log(e)
        }

        dispatch({ type: 'LOGOUT' })

        // setUserToken(null)
        // setIsLoading(false)
      },
    }),
    [],
  )

  // ลองเรียกดู userToken
  console.log(loginState.userToken)

  //แสดง Loading หมุนๆ ขึ้นมา
  if (loginState.isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )

  return (
    <AuthContext.Provider value={authContexValue}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        {loginState.userToken !== null ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Navigation
