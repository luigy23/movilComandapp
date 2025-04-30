import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        try {
            logout();
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión');
        }
    };

    return (    
        <ScrollView style={styles.container} className="p-4">
            <Text className="text-2xl font-bold mb-8">Dashboard</Text>
            <Text className="text-lg font-semibold mb-4">Bienvenido {user?.name}</Text>
            {user && (
                <View className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <Text className="text-lg font-semibold mb-4">Información del Usuario:</Text>
                    {Object.entries(user).map(([key, value]) => (
                        <View key={key} className="mb-2">
                            <Text className="font-medium">{key}:</Text>
                            <Text className="text-gray-600">{JSON.stringify(value)}</Text>
                        </View>
                    ))}
                </View>
            )}
            <Link href="../Mesas" asChild>    
                <Pressable className="bg-blue-500 px-6 py-3 rounded-lg active:opacity-80">
                    <Text className="text-white font-semibold">Mesas</Text>
                </Pressable>
            </Link>
            <Pressable 
                onPress={handleLogout}
                className="bg-red-500 px-6 py-3 rounded-lg active:opacity-80"
            >
                <Text className="text-white font-semibold">Cerrar Sesión</Text>
            </Pressable>
        </ScrollView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
}); 