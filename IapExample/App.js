import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View, TouchableOpacity,
  ImageBackground,
  Modal
} from 'react-native';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import React, { Component } from 'react';

import NativeButton from 'apsl-react-native-button';

// App Bundle > com.dooboolab.test

const itemSkus = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
<<<<<<< Updated upstream
    'id1',
    'id2',
    'id2',
    'id3',
    'id4',
    'id5',
=======
    // 'android.test.purchased',
    // 'android.test.canceled',
    // 'android.test.refunded',
    // 'android.test.item_unavailable',

>>>>>>> Stashed changes
    // 'point_1000', '5000_point', // dooboolab
    'id1',
    'id2',
    'id2',
    'id3',
    'id4',
    'id5',
  ],
});

const itemSubs = Platform.select({
  ios: [
    'com.cooni.point1000',
    'com.cooni.point5000', // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
});

const fakeData = [
<<<<<<< Updated upstream
  {title:'0.5$ FOR SET USER1', productId:'id1'},
  {title:'0.99$ FOR SET USER2', productId:'id2'},
  {title:'1.99$ FOR SET USER3', productId:'id3'},
  {title:'4.99$ FOR SET USER4', productId:'id4'},
  {title:'9.99$ FOR SET USER5', productId:'id5'},
=======
  { title: '0.5$ FOR SET USER1', productId: 'id1' },
  { title: '0.99$ FOR SET USER2', productId: 'id2' },
  { title: '1.99$ FOR SET USER3', productId: 'id3' },
  { title: '4.99$ FOR SET USER4', productId: 'id4' },
  { title: '9.99$ FOR SET USER5', productId: 'id5' },
>>>>>>> Stashed changes
]

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      receipt: '',
      availableItemsMessage: '',
    };
  }

  async componentDidMount(): void {
    try {
      await RNIap.initConnection();
      if (Platform.OS === 'android') {
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      } else {
        // * WARNING This line should not be included in production code
        // This call will call finishTransaction in all pending purchases on every launch,
        // effectively consuming purchases that you might not have verified the receipt or given the consumer their product
        // TL;DR you will no longer receive any updates from Apple on every launch for pending purchases
        await RNIap.clearTransactionIOS();
      }
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        console.info('purchase', purchase);

        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : purchase.originalJson;
        console.info(receipt);
        if (receipt) {
          try {
            const ackResult = await finishTransaction(purchase);
            console.info('ackResult', ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }

          this.setState({ receipt }, () => this.goNext());
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        Alert.alert('purchase error', JSON.stringify(error));
      },
    );

    this.getItems()
  }

  componentWillUnmount(): void {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }

    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }

    RNIap.endConnection();
  }

  goNext = (): void => {
    Alert.alert('Receipt', this.state.receipt);
  };

  getItems = async (): void => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      console.log('============', products)
      // const products = await RNIap.getSubscriptions(itemSkus);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  getSubscriptions = async (): void => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log('Products', products);
      this.setState({ productList: products });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  getAvailablePurchases = async (): void => {
    try {
      console.info(
        'Get available purchases (non-consumable or unconsumed consumable)',
      );

      const purchases = await RNIap.getAvailablePurchases();
      console.log('Available purchases :: ', purchases);
      if (purchases && purchases.length > 0) {
        this.setState({
          availableItemsMessage: `Got ${purchases.length} items.`,
          receipt: purchases[0].transactionReceipt,
        });
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  requestPurchase = async (sku): void => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  requestSubscription = async (sku): void => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  render(): React.ReactElement {
    const { productList, receipt, availableItemsMessage } = this.state;
    const receipt100 = receipt.substring(0, 100);
    let data = productList
    if (data?.length == 0) {
      data = fakeData
    }

    return (
      <ImageBackground resizeMode='cover' source={require('./assets/z3556952069500_e0138f189c5ce43cffbc3964307c52dc.jpg')} style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginTop: 20, marginBottom: 50, marginLeft: 20 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
          </TouchableOpacity>
<<<<<<< Updated upstream
          <ScrollView style={{alignSelf: 'stretch'}}>
            {data.map((product, i) => {
              const title = i === 0 ? '0.5$ FOR SET USER1'
                : i === 1 ? '0.99$ FOR SET USER2'
                  : i === 2 ? '1.99$ FOR SET USER3'
                    : i === 3 ? '4.99$ FOR SET USER4'
                      : i === 4 ? '9.99$ FOR SET USER5' : null
=======
          <ScrollView style={{ alignSelf: 'stretch' }}>
            {data.map((product, i) => {
              const title = i === 0 ? 'Package1 (0.5$)'
                : i === 1 ? 'Package2 (0.99$)'
                  : i === 2 ? 'Package3 (1.99$)'
                    : i === 3 ? 'Package4 (4.99$)'
                      : i === 4 ? 'Package5 (9.99$)' : null
>>>>>>> Stashed changes
              const price = i === 0 ? '0.5$'
                : i === 1 ? '0.99$'
                  : i === 2 ? '1.99$'
                    : i === 3 ? '4.99$'
                      : i === 4 ? '9.99$' : null
              return (
                <TouchableOpacity
                  onPress={() => this.requestPurchase(product.productId)}
                  key={i}
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginBottom: 20,
                    marginHorizontal: 20,
                    paddingVertical: 20,
                    borderRadius: 10,
                    // justifyContent: 'space-between',
                    alignItems: 'center'
                    // borderTopLeftRadius:15,
                    // borderBottomRightRadius:15,
                    // borderTopRightRadius:40,
                    // borderBottomLeftRadius:40
                  }}
                >
<<<<<<< Updated upstream
                  <Text
                    style={{
                      fontSize: 15,
                      alignSelf: 'center',
                      paddingHorizontal: 20,
                      fontWeight:'bold'
                    }}
                  >
                    {title}
                  </Text>
=======
                  <View>
                    {/* <Text
                      style={{
                        fontSize: 15,
                        // alignSelf: 'center',
                        paddingHorizontal: 20,
                        fontWeight: 'bold',
                        color: 'red'
                      }}
                    >
                      {price} */}
                    {/* </Text> */}
                    <Text style={{ marginHorizontal: 20, fontWeight: 'bold', color: 'red', textAlign: 'center' }}>{title}</Text>
                  </View>

                  {/* <TouchableOpacity onPress={() => this.requestPurchase(product.productId)} style={{backgroundColor:'red', marginHorizontal:5, paddingHorizontal:20, paddingVertical:5, borderRadius:10}}>
                    <Text style={{fontWeight:'bold', color:'white'}}>Buy</Text>
                  </TouchableOpacity> */}

>>>>>>> Stashed changes
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default Page;
