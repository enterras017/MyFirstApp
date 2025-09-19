import React, { createContext, useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Button, useColorScheme, TextInput, Keyboard, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

// テーマ関連の型定義
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

// テーマコンテキストの作成
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// テーマフック
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// テーマプロバイダーコンポーネント
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = React.useState<Theme>('light');

  // アプリ起動時に保存されたテーマを読み込み
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setThemeState(savedTheme);
      } else {
        // 保存されていない場合はシステム設定に従う
        setThemeState(systemColorScheme === 'dark' ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('テーマの読み込みに失敗:', error);
      setThemeState(systemColorScheme === 'dark' ? 'dark' : 'light');
    }
  };

  const saveTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem('appTheme', newTheme);
    } catch (error) {
      console.error('テーマの保存に失敗:', error);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const isDark = theme === 'dark';

  const value: ThemeContextType = {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type SettingsScreenProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  const { isDark } = useTheme();
  const [count, setCount] = React.useState<number>(0);
  const [name, setName] = React.useState<string>('');
  const [nameError, setNameError] = React.useState<string | null>(null);

  React.useEffect(() => {
    loadName();
  }, []);

  const saveName = async (newName: string) => {
    try {
      await AsyncStorage.setItem('userName', newName);
    } catch (error) {
      console.error('名前の保存に失敗:', error);
    }
  };

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

  const validateName = (text: string): string | null => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return '1文字以上入力してください';
    if (trimmed.length > 20) return '20文字以内で入力してください';
    const allowed = /^[\p{L}\p{N} _-]+$/u;
    if (!allowed.test(trimmed)) return '使用できるのは日本語・英数字・スペース・-_のみです';
    return null;
  };

  const handleNameChange = (newName: string) => {
    setName(newName);
    const error = validateName(newName);
    setNameError(error);
    if (newName.trim().length === 0) {
      AsyncStorage.removeItem('userName').catch(() => {});
      return;
    }
    if (!error) saveName(newName);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, isDark && styles.darkContainer]} onTouchStart={Keyboard.dismiss}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={styles.section}>
          <Text style={[styles.title, isDark && styles.darkText]}>React Nativeへようこそ</Text>
          <Text style={[styles.desc, isDark && styles.darkText]}>これは学習用の日本語UIです。</Text>
        </View>

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
          {nameError && (<Text style={styles.error}>{nameError}</Text>)}
          {name.trim().length > 0 && (<Text style={[styles.greet, isDark && styles.darkText]}>こんにちは、{name} さん！</Text>)}
        </View>

        <View style={styles.section}>
          <Text style={[styles.count, isDark && styles.darkText]}>カウント: {count}</Text>
          <View style={styles.row}>
            <Button title="増やす" onPress={() => setCount((prev: number) => prev + 1)} />
            <Button title="減らす" onPress={() => setCount((prev: number) => prev - 1)} />
            <Button title="リセット" onPress={() => setCount(0)} />
          </View>
        </View>

        <View style={styles.section}>
          <Button title="設定へ" onPress={() => navigation.navigate('Settings')} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function SettingsScreen({ navigation }: SettingsScreenProps) {
  const { isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState<boolean>(true);

  const handleThemeToggle = (value: boolean) => {
    toggleTheme();
    console.log('テーマ切り替え:', value ? 'ダーク' : 'ライト');
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotifications(value);
    console.log('通知設定:', value ? 'ON' : 'OFF');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        
        <View style={styles.section}>
          <Text style={[styles.title, isDark && styles.darkText]}>設定</Text>
          <Text style={[styles.desc, isDark && styles.darkText]}>アプリの設定を変更できます。</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, isDark && styles.darkText]}>ダークモード</Text>
            <Switch
              value={isDark}
              onValueChange={handleThemeToggle}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, isDark && styles.darkText]}>通知</Text>
            <Switch
              value={notifications}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Button title="ホームに戻る" onPress={() => navigation.navigate('Home')} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              title: 'ホーム',
              headerBackTitle: '戻る',
            }} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ 
              title: '設定',
              headerBackTitle: '戻る',
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center', alignItems: 'center', gap: 24 },
  darkContainer: { backgroundColor: '#1a1a1a' },
  section: { width: '100%', alignItems: 'center', gap: 8 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  darkText: { color: '#fff' },
  desc: { fontSize: 16, color: '#555', textAlign: 'center' },
  inputContainer: { width: '100%', position: 'relative' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 12, paddingRight: 40, height: 44 },
  clearButton: { position: 'absolute', right: 8, top: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' },
  clearButtonText: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  error: { color: 'crimson', marginTop: 6, fontSize: 14 },
  greet: { fontSize: 18, marginTop: 4 },
  count: { fontSize: 20, fontWeight: '600', textAlign: 'center' },
  row: { flexDirection: 'row', gap: 12, marginTop: 8 },
  settingRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: { fontSize: 16, color: '#333' },
});