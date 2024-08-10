import { useState } from 'react'
import { Button, FlatList, StyleSheet, View } from 'react-native'
import GoalInput from './components/GoalInput'
import GoalItem from './components/GoalItem'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [goals, setGoals] = useState<{ text: string; id: string }[]>([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const addGoalHandler = (text: string) => {
    setGoals((currentGoals) => {
      // const newGoals = [...currentGoals, { text: inputValue, key: Math.random().toString() }]
      // you should manually set a key or use a keyExtractor
      const newGoals = [...currentGoals, { text, id: Math.random().toString() }]
      return newGoals
    })
    endModalHandler()
  }

  const deleteGoalHandler = (goalId: string) => {
    setGoals((goals) => goals.filter((g) => g.id !== goalId))
  }

  const startAddModalHandler = () => {
    setModalIsVisible(true)
  }

  const endModalHandler = () => {
    setModalIsVisible(false)
  }

  // const isTextInvalid = goals.some((g) => g.text === inputValue)

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Button title="Add new goal" color="#2d9b53" onPress={startAddModalHandler} />
        <GoalInput visible={modalIsVisible} onHide={endModalHandler} onAddGoal={addGoalHandler} />

        <View style={styles.goalsContainer}>
          {/* <ScrollView alwaysBounceVertical={false}> */}
          {/* {goals ? (
        goals.map((g) => (
          <View key={g} style={[styles.goal, g === inputValue ? styles.conflictingGoal : undefined]}>
            <Text style={styles.goalText}>{g}</Text>
          </View>
        ))
      ) : (
        <Text>No goals.</Text>
      )} */}
          {/* </ScrollView> */}
          <FlatList
            alwaysBounceVertical={false}
            data={goals}
            renderItem={(itemData) => (
              <GoalItem text={itemData.item.text} id={itemData.item.id} onDelete={deleteGoalHandler} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 6
  }
})
