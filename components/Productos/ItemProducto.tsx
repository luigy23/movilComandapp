import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { Image } from 'expo-image'
import { Product } from '@/services/productsService'

interface ItemProductoProps {
    product: Product
    index: number
    onAdd: () => void
}


const ItemProducto = ({ product, index, onAdd }: ItemProductoProps) => {

    const [modalVisible, setModalVisible] = useState(false)

    const bgColors = [
        'bg-yellow-100',
        'bg-pink-100',
        'bg-green-100',
        'bg-orange-100',
    ];
    return (

        <>
        <Pressable onPress={onAdd} className={`flex-1 rounded-2xl p-4 mb-2 relative overflow-hidden ${bgColors[index % bgColors.length]}`} style={{ minHeight: 160 }}>
            <Image
                source={product.imageUrl}
                className="w-16 h-16 rounded-xl self-center mb-2"
                style={{ resizeMode: 'contain' }}
            />
            <Text className="text-base font-bold text-gray-800 mb-1">{product.name}</Text>
            <Text className="text-lg font-semibold text-gray-700 mb-2">${product.price}</Text>
            <View className="absolute bottom-4 right-4 bg-green-400 rounded-full w-8 h-8 items-center justify-center shadow-md">
                <Ionicons name="add" size={20} color="#fff" />
            </View>
        </Pressable>
        
        </>
    )
}

export default ItemProducto