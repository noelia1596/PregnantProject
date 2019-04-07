import React, {Component} from 'react';
import {ThemeProvider} from 'react-native-elements';
import {AsyncStorage, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {MenuProvider} from "react-native-popup-menu";

import axios, {httpClient} from './appUtility/Api';
import Router from './Router'
import store from './stores';
import firebase from 'react-native-firebase';
import SplashPage from "./SplashPage";

class App extends Component<{}> {

  state = {
    loggedIn: false,
    loading: true,
    splashLoading: true,
    user: null,
    // fcmToken: 'TkQ0cW9BRzNnaWtvU3F0QkJtWEN5UT09',
    fcmToken: ''
  };

  constructor() {
    super();
    const deviceId = DeviceInfo.getBrand() + "," + DeviceInfo.getDeviceId() + "," + DeviceInfo.getDeviceName();
    console.log("deviceId: ", deviceId);
    axios.defaults.headers.common['Authorization'] = "Bearer fAFOOrMiRNSEjOJoelhoDjoKhVokoRvxKwRkouRVNdyxQUdDmCQnVtQyNzqGtwglfUHgJYvitsTyIVMBNkwOpYvqMgzKisfgSFfHCGvRWfRATMhkHTMmaWllbRoyaCaYIPYnrPzcslAetbYavGEEOKeSWvcuNbuxWdrboNbkkVAWssoFKSGdcVxxxzJfdjdciHSUOLscQnGpQFJaXraiAEljjoKkLVbSiCJyLrAabrAdOkaXFcSrUfomQDyVwYUkOXixAFactmEraPeqQDHsoSbVXyxljdYyZhavXGDlbxpuvFPldXgddsEsLkKYARjBybykgkDVFpfJHRUrzMNDXnZhFSHvHvJXKVRpXQTFgYGJwlHfEHyeKRlddakllyTrONgGOXUiBNqWytrRwnKKesADLfRjkPwPAmnuQUjGZBemjVUOBWZSAXnwhASWUWqdSSBNMhyfMhDhYewcuwecHnsqezrNLdacvhvWDSWATfoodBgnevRZfUaDPgfXpHPHSeaDCoKANpippngobqgulPqaRpKxEdRqTKjhZlFnTKSBkwhVnqEMLlUsAKBFFbgGJOmwcGggZtkQhQtjikGTGKpUyVoEsFPCShJejnyVVDEBwMJeHqGnAMAOGIaeCXtSTZrvtPzaLrAxHXNmHTTlmNjaVYWtxkZsLWhFmtlzyCbpTUncTLKKPgiIBhGrYdlbhEIndNwKXRVtEQZYffRoxsQAvKXNYxNHcxtARyMweVjCLxLKejGCSFRpZjMuUgqMabCWstErBQzRTjBiQYVOupTxfvEoLBvkpfXktZBeiprstfxwMPtVdZdRLMmbVfEnzbcUnKnpWCKVvrLXJwCAHykMfjyvuJgYsvySfADtyUFpcscIFolsEBIAwzCnIqTLCpGTNNyorIqMpDqCVSqQqBTYhmbrWfogoolKSYyZjJHPVfNjgpKJnsDWwgYROeAaNVBtQqgCnrYpwgApZrcQfbbXcsbFmSNTenELDBviGjwsfkGgElZQVniKLmqhfEZm";
    axios.defaults.headers.common['token'] = "TkQ0cW9BRzNnaWtvU3F0QkJtWEN5UT09";
    axios.defaults.headers.common['Device-ID'] = "Android";
    httpClient.defaults.headers.common['Device-Meta'] = deviceId;

    // setTimeout(() => this.setState({splashLoading: false}), 1000)
    setTimeout(() => this.setState({splashLoading: false}), 5000)
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }


  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }


  componentWillMount() {
//testing
    // httpClient.defaults.headers.common['Access-Token'] = '7892897423849273jkshkjksdf';

    AsyncStorage.getItem('access_token').then((token) => {
      httpClient.defaults.headers.common['Access-Token'] = token;
      this.setState({
        token,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        loading: false
      });
    })
  };

  //----------------firebase--------------
  //1
  async checkPermission() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log('Permission granted ');
          this.getToken();
        } else {
          console.log('Permission request ');
          this.requestPermission();
        }
      });
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const {title, body} = notification;
      console.log('onNotification:', notification);
      // this.showAlert(title, body);
      // alert('message');

      const localNotification = new firebase.notifications.Notification({
        // sound: 'mellobullpartnersound',
        show_in_foreground: true,
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        // .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        // .setData(notification.data)
        .android.setChannelId('com_medifellows_fcm_default_channel') // e.g. the id you chose above
        // .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
        // .android.setColor('#ff7e00') // you can set a color here
        .android.setPriority(firebase.notifications.Android.Priority.High);


      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });


    const channel = new firebase.notifications.Android.Channel('com_medifellows_fcm_default_channel', 'Medifellows', firebase.notifications.Android.Importance.High)
      .setDescription('Medifellows');
    firebase.notifications().android.createChannel(channel);

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const {title, body} = notificationOpen.notification;
      console.log('onNotificationOpened:');
      // this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      console.log('getInitialNotification:');
      // this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  async getToken() {
    console.log('getting fcmToken');
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('after fcmToken: ', fcmToken);
        //httpClient.defaults.headers.common['Device-ID'] = fcmToken;
        this.setState({fcmToken});
        // Constant.setDeviceToken(fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } else {
        console.log('fcmToken not found');
      }
    } else {
      console.log('already fcmToken: ', fcmToken);
      // Clipboard.setString(fcmToken);
      // Constant.setDeviceToken(fcmToken);
      //httpClient.defaults.headers.common['Device-ID'] = fcmToken;
      this.setState({fcmToken});
    }
  }

  //2
  async requestPermission() {
    firebase.messaging().requestPermission()
      .then(() => {
        console.log('Permission granted in requestPermission');
        this.getToken();
      })
      .catch(error => {
        console.log('permission rejected');
      });
  }

  //----------------end--------------
  isShowingSplash = () => {
    // return (this.state.splashLoading || this.state.loading)
    return (this.state.splashLoading || this.state.loading || this.state.fcmToken === '' )
  };

  render() {
    if (this.isShowingSplash()) {
      return <SplashPage/>
    }

    return (
      <ThemeProvider>
        <MenuProvider>
          <Provider store={store}>
            <Router style={styles.container} token={this.state.token} fcmToken={this.state.fcmToken}/>
          </Provider>
        </MenuProvider>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
});
export default App;
