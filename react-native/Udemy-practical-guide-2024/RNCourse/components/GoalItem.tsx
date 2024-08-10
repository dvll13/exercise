import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native'

interface Props {
  text: string
  id: string
  onDelete: (id: string) => void
}

export default function GoalItem({ text, id, onDelete }: Props) {
  /* <View style={[styles.goal, isConflicting ? styles.conflictingGoal : undefined]}> */
  return (
    <View style={styles.goal}>
      <Pressable
        android_ripple={{ color: '#135e2d' }}
        onPress={() => onDelete(id)}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  goal: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#2d9b53'
  },
  goalText: {
    paddingVertical: 5,
    paddingHorizontal: 14,
    color: '#ddd',
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.6
  }
  //   conflictingGoal: {
  //     borderWidth: 1,
  //     borderColor: 'red'
  //   }
})
