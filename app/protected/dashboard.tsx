import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useAtom } from 'jotai';
import { userInfoAtom } from '~/contexts/authContext';
import { useAuthService } from '~/contexts/authContext';

const Dashboard = () => {
    const [userInfo] = useAtom(userInfoAtom);
    const { logout } = useAuthService();

    const handleLogout = async () => {
        try {
            await logout();
            router.replace('/auth/login');
        } catch (error) {
            Alert.alert('Error', 'No se pudo cerrar sesión');
        }
    };

    return (
        <ScrollView style={styles.container} className="p-4">
            <Text className="text-2xl font-bold mb-8">Dashboard</Text>
            <Text className="text-lg font-semibold mb-4">Bienvenido {userInfo?.name}</Text>
            {userInfo && (
                <View className="mb-8 p-4 bg-gray-100 rounded-lg">
                    <Text className="text-lg font-semibold mb-4">Información del Usuario:</Text>
                    {Object.entries(userInfo).map(([key, value]) => (
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