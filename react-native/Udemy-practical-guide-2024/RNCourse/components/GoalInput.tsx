import { useState } from 'react'
import { Button, Image, Modal, StyleSheet, TextInput, View } from 'react-native'

interface Props {
  onAddGoal: (text: string) => void
  visible: boolean
  onHide: () => void
  // isTextInvalid: boolean
}

export default function GoalInput({ onAddGoal, visible, onHide }: Props) {
  const [inputValue, setInputValue] = useState('')

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image source={require('../assets/images/goal.png')} style={styles.image} />

        <TextInput
          // style={[styles.inputText, isTextInvalid ? styles.invalidInputText : null]}
          style={styles.textInput}
          placeholder="Enter your goals..."
          value={inputValue}
          onChangeText={setInputValue}
        />

        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button title="Close" onPress={onHide} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button
              title="Add goal"
              onPress={() => {
                onAddGoal(inputValue)
                //   setInputValue('')
              }}
              color="#a676e5"
              // disabled={!inputValue || isTextInvalid}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#311b6b',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderColor: '#e4d0ff',
    borderRadius: 6,
    width: '100%',
    padding: 16,
  },
  // invalidInputText: {
  //   borderColor: 'red'
  // },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '30%',
    margin: 10,
  },
})
