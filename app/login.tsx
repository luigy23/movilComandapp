import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native'
import { useAuth } from '@/hooks/useAuth'
import { Link, router } from 'expo-router'
import { authActionsAtom } from '@/store/auth'
import { useAtom } from 'jotai'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [loading, setLoading] = useState(false)

    const [, authActions] = useAtom(authActionsAtom);

    const handleLogin = async () => {
        setLoading(true)    
        //verificar si los campos estan llenos
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingresa todos los campos')
            return
        }

        try {
            const success = await authActions({ type: 'LOGIN', payload: { email, password } })
            if (success) {
                router.replace('/dashboard')
            }
            else {
                Alert.alert('Error', 'Ocurrió un error al iniciar sesión')
            }
        
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Ocurrió un error al iniciar sesión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container} className="px-6">
          

            <Text className="text-3xl font-bold mb-12">
                Iniciar <Text className="text-emerald-600">Sesión</Text>
            </Text>

            <View className="w-full gap-4">
                {/* Input de Usuario/Correo */}
                <View className="w-full">
                    <TextInput
                        placeholder="Usuario / correo"
                        value={email}
                        onChangeText={setEmail}
                        className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                        placeholderTextColor="#9CA3AF"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                {/* Input de Contraseña */}
                <View className="w-full">
                    <TextInput
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        className="w-full bg-gray-100 rounded-lg px-4 py-3 text-gray-700"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Checkbox Recordar */}
                <View className="flex-row items-center">
                    <Pressable 
                        onPress={() => setRememberMe(!rememberMe)}
                        className={`w-5 h-5 border border-gray-300 rounded mr-2 ${rememberMe ? 'bg-emerald-600' : 'bg-white'}`}
                    />
                    <Text className="text-gray-600">Recordar</Text>
                </View>

                {/* Botón de Ingresar */}
                <Pressable 
                    onPress={handleLogin}
                    disabled={loading}
                    className={`w-full bg-black rounded-lg py-4 mt-4 active:opacity-80 ${loading ? 'opacity-70' : ''}`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white text-center text-lg font-semibold">
                            Ingresar
                        </Text>
                    )}
                </Pressable>
            </View>
    
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
}) 