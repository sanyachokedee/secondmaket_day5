import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import * as ImagePicker from 'expo-image-picker'
import * as ImagePicker from 'react-native-image-picker'

// Theme
import { colors } from '../themes/MainTheme'

// ขอตัวแปร PermissionAndroid เพ่ื่อตรวจสอบสิทธิ์
// import { PermissionsAndroid } from 'react-native'

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    // requestPermission()
  }, [])

  const requestPermission = async () => {
    console.log('PermissionsAndroid.request =',PermissionsAndroid.request)
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      // if get here, the user has accepted the permissions
      selectImage()
    } else {
      // if get here, the user did NOT accepted the permissions
      alert("You need to enable permission to access the library.")
    }
  }

  // ขออนุญาต Permision ใน ios ต้องทำ ของ android ขอผ่าน AdroidMainifest แล้ว
  // const requestPermission = async () => {
  //   const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
  //   if (!granted) alert('You need to enable permission to access the library.')
  // }

  const handlePress = () => {
    if (!imageUri) selectImage()
    else
      Alert.alert('ลบรายการ', 'ต้องการลบภาพนี้หรือไม่ ?', [
        { text: 'ใช่ลบเลย', onPress: () => onChangeImage(null) },
        { text: 'ไม่เก็บไว้' },
      ])
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false, //เก็บรูปธรรมดา
          maxHeight: 200, // ปรับความสูงขนาดภาพได้
          maxWidth: 200, // ปรับความกว้างขนาดภาพได้
        },
        res => {
          console.log(res)
          // ถ้าผู้ใช้ไม่ได้เลือกรูปใดๆ ตามรูปคือ ผู้ใช้เลือกก็ไปเรียก onChangeImage เอา Path uri ไปใช้
          if (!res.didCancel) {
            onChangeImage(res.uri)
          }
        },
      )
    } catch (error) {
      console.log('Error reading an image', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialIcons color={colors.medium} name="camera" size={40} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
})

export default ImageInput
