import React from 'react';
import { StatusBar, StyleSheet, Text, View, Button, useColorScheme, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  const [count, setCount] = React.useState<number>(0);
  const [name, setName] = React.useState<string>('');

  // アプリ起動時に保存された名前を読み込み
  React.useEffect(() => {
    loadName();
  }, []);

  // 名前を保存
  const saveName = async (newName: string) => {
    try {
      await AsyncStorage.setItem('userName', newName);
    } catch (error) {
      console.error('名前の保存に失敗:', error);
    }
  };

  // 保存された名前を読み込み
  const loadName = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      if (savedName !== null) {
        setName(savedName);
      }
    } catch (error) {
      console.error('名前の読み込みに失敗:', error);
    }
  };

  // 名前が変更されたら保存
  const handleNameChange = (newName: string) => {
    setName(newName);
    saveName(newName);
  };

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
          <View style={styles.inputContainer}>
            <TextInput
              value={name}
              onChangeText={handleNameChange}
              placeholder="お名前を入力"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              style={styles.input}
            />
            {name.length > 0 && (
              <TouchableOpacity onPress={() => { handleNameChange(''); Keyboard.dismiss(); }} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
          {name.trim().length > 0 && (
            <Text style={styles.greet}>こんにちは、{name} さん！</Text>
          )}
        </View>

        {/* カウンター */}
        <View style={styles.section}>
          <Text style={styles.count}>カウント: {count}</Text>
          <View style={styles.row}>
            <Button title="増やす" onPress={() => setCount((prev: number) => prev + 1)} />
            <Button title="減らす" onPress={() => setCount((prev: number) => prev - 1)} />
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
  inputContainer: { width: '100%', position: 'relative' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingRight: 40, height: 44 },
  clearButton: { position: 'absolute', right: 8, top: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  clearButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  greet: { fontSize: 18, marginTop: 4 },
  count: { fontSize: 20, fontWeight: '600', textAlign: 'center' },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
});