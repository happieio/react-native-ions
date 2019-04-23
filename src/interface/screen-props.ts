type RouteName =
    'InventoryList' | 'InventoryDetail' |
    'OrderList' | 'OrderDetail' |
    'ProductList' | 'ProductDetail'

interface Navigation<StateParams> {
    dispatch: (route: string) => void
    navigation: {
        state: {
            params: StateParams
        }
        getParam: (key: string, defaultVal: any) => any
        navigate: (route: RouteName, param?: any) => void
        push: (route: RouteName, param?: any) => void
        pop: () => void
        replace: (route: RouteName, param?: any) => void
    }
}