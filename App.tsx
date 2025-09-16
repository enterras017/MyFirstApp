import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button, useColorScheme, TextInput, Keyboard } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.section}>
          <Text style={styles.title}>React Nativeへようこそ</Text>
          <Text style={styles.desc}>これは学習用の日本語UIです。</Text>
        </View>

        {/* 入力フォーム */}
        <View style={styles.section}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="お名前を入力"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
          {name.trim().length > 0 && (
            <Text style={styles.greet}>こんにちは、{name} さん！</Text>
          )}
        </View>

        {/* カウンター */}
        <View style={styles.section}>
          <Text style={styles.count}>カウント: {count}</Text>
          <View style={styles.row}>
            <Button title="増やす" onPress={() => setCount(c => c + 1)} />
            <Button title="減らす" onPress={() => setCount(c => c - 1)} />
            <Button title="リセット" onPress={() => setCount(0)} />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center', alignItems: 'center', gap: 24 },
  section: { width: '100%', alignItems: 'center', gap: 8 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  desc: { fontSize: 16, color: '#555', textAlign: 'center' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, height: 44 },
  greet: { fontSize: 18, marginTop: 4 },
  count: { fontSize: 20, fontWeight: '600', textAlign: 'center' },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
});