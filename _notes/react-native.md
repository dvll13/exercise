## Styles
- `const styles = StyleSheet.create({...})` - imitate most CSS props + additional ones
- styles don't get **inherited**
- `<View>` **supports** round border **corners** for A and I, while text supports it only for A
- `<ScrollView>` should be added in `<View>`
- `<FlatList>` - virtualized scrollable list
- `<Pressable>` - wraps a component to make it pressable
- `<Image source={require('../assets/images/goal.png')} />`
- set a default app background in `app.json`: `"backgroundColor": "#1e085a",`
- `<StatusBar style="light" />` - set statusbar's style to contrast with app's background