import React, { SFC, useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { getPagedProductsAction, selectAllProducts, selectAllProductsTotal } from '@state/product';
import { Product } from '@interface/common';
import { navigate } from "@nav/util/nav-service";

interface SFCExt<Props> extends SFC<Props> {
  navigationOptions: any
}

interface Props extends Navigation<{}> {
  allProducts: any
  getPagedProductsAction: any
  total: number
}

const s = StyleSheet.create({
  button: { margin: 10, fontSize: 20, padding: 10 },
  headerButton: { marginRight: 20, fontSize: 20 }
})

const pullMoreProducts = (last: number, setPage: Function, total: number, localCount: number, productAction: any) => () => {
  if (total === 0) productAction(last)
  else if (total > localCount) productAction(last)
  setPage(last + 1)
}

const getProductKey = (item: any) => String(item ? item.id : null)

const renderLine = ({ item }: { item: Product }) => {
  if(!item) return null
  return (<TouchableOpacity style={s.button} onPress={() => navigate('ProductDetail', { id: item ? item.id : null, layout: 'View' })}>
  <Text>{item ? item.product_name : null} : {item ? item.brand: null}</Text>
</TouchableOpacity>)
}

export const _ProductListScreen: SFCExt<Props> = ({ allProducts, total, getPagedProductsAction }) => {
  const [lastPage, setPage] = useState(0);

  useEffect(() => {
    pullMoreProducts(lastPage, setPage, total, allProducts.length, getPagedProductsAction)()
  }, [])

  //
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={allProducts}
        extraData={allProducts.length}
        renderItem={renderLine}
        onEndReachedThreshold={1}
        keyExtractor={getProductKey}
        onEndReached={pullMoreProducts(lastPage, setPage, total, allProducts.length, getPagedProductsAction)}>
      </FlatList>
    </View>
  );
}

_ProductListScreen.navigationOptions = {
  title: 'Product List',
  headerRight: (
    <TouchableOpacity style={s.headerButton} onPress={() => navigate('ProductDetail', { layout: 'Create' })}>
      <Text>New</Text>
    </TouchableOpacity>
  )
};

const mapStateToProps = (state: any) => ({
  allProducts: selectAllProducts(state),
  total: selectAllProductsTotal(state)
})

export const ProductListScreen = connect(mapStateToProps, { getPagedProductsAction }, null)(_ProductListScreen)