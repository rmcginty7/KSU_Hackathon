import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

export default function Register() {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <TextInput placeholder="first name" style={styles.input} />
            <TextInput placeholder="last name" style={styles.input} />
            <TextInput placeholder="email" style={styles.input} />
            <TextInput placeholder="password" secureTextEntry style={styles.input} />
            <Pressable style={styles.button} onPress={() => router.push("/auth/login")}>
                <Text style={styles.buttonText}>Register</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,

    },
    input: {
        width: '50%',
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        width: '50%',
        borderRadius: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
        
})