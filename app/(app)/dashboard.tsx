import React from 'react';
import { View, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import Txt from '@/components/Txt';

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
            <Txt className="text-2xl font-bold mb-8">Dashboard</Txt>
            <Txt className="text-lg font-semibold mb-4">Bienvenido {user?.name}</Txt>
            {user && (
                <View className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <Txt className="text-lg font-semibold mb-4">Información del Usuario:</Txt>
                    {Object.entries(user).map(([key, value]) => (
                        <View key={key} className="mb-2">
                            <Txt className="font-medium">{key}:</Txt>
                            <Txt className="text-gray-600">{JSON.stringify(value)}</Txt>
                        </View>
                    ))}
                </View>
            )}
            <Link href="../Mesas" asChild>    
                <Pressable className="bg-blue-500 px-6 py-3 rounded-lg active:opacity-80">
                    <Txt className="text-white font-semibold">Mesas</Txt>
                </Pressable>
            </Link>
            <Pressable 
                onPress={handleLogout}
                className="bg-red-500 px-6 py-3 rounded-lg active:opacity-80"
            >
                <Txt className="text-white font-semibold">Cerrar Sesión</Txt>
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