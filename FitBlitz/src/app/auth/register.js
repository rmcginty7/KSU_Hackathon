import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const API_URL = 'http://localhost:3001';

export default function Register() {
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [DOB, setDOB] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        console.log('Register button pressed');

        if (!userName || !firstName || !lastName || !email || !password || !DOB) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName,
                    name: `${firstName} ${lastName}`,
                    email,
                    password,
                    dob: DOB,
                }),
            });

            const data = await response.json();
            console.log('API response:', data);

            if (!response.ok) {
                setError(data.error);
                return;
            }

            setError('John Pork is coming after you...');  // Meme - Original Msg: Account has been successfully created

            setTimeout(() => { 
                router.push('/auth/login'); 
            }, 5000);

        } catch (err) {
            setError('Could not connect to server');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <TextInput placeholder="First Name" style={styles.input} value={firstName} onChangeText={setFirstName} />
            <TextInput placeholder="Last Name" style={styles.input} value={lastName} onChangeText={setLastName} />
            <TextInput placeholder="Username" style={styles.input} value={userName} onChangeText={setUserName} autoCapitalize="none" />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <TextInput placeholder="Password" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            <TextInput placeholder="Date of Birth (YYYY-MM-DD)" style={styles.input} value={DOB} onChangeText={setDOB} />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Register</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.cancelText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
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
    buttonDisabled: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelText: {
        marginTop: 16,
        color: '#888',
        fontSize: 14,
    },

    errorText:{
        color: 'red',
        marginBottom: 8,
        fontSize: 14,
        textAlign: 'center',
    }
});