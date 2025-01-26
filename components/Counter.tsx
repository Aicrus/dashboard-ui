import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador Multiplataforma</Text>
      
      <Text style={styles.count}>{count}</Text>
      
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.button, styles.buttonMinus]} 
          onPress={() => setCount(prev => prev - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>

        <Pressable 
          style={[styles.button, styles.buttonPlus]}
          onPress={() => setCount(prev => prev + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  count: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonMinus: {
    backgroundColor: '#FF5252',
  },
  buttonPlus: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 