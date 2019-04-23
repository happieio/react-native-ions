import React, { SFC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Product } from '@interface/common';

interface Props {
    //declare props here
    product: Product
}

const price = (v: number) => `$${(v / 100)}`

const s = StyleSheet.create({
    line: { fontSize: 20, marginHorizontal: 20, marginVertical: 10 }
})

export const ProductDetailView: SFC<Props> = ({ product }) => {
    return (
        <View>
            <Text style={s.line}>ID: {product.id}</Text>
            <Text style={s.line}>Name: {product.product_name}</Text>
            <Text style={s.line}>Brand: {product.brand}</Text>
            <Text style={s.line}>Ship Price: {price(product.shipping_price)}</Text>
            <Text style={s.line}>Description: {product.description}</Text>
            <Text style={s.line}>Type: {product.product_type}</Text>
            <Text style={s.line}>Style: {product.style}</Text>
        </View>
    )
}