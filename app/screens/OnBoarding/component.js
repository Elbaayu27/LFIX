import React from 'react';
import { View, Alert, StatusBar, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import Button from '../../components/elements/Button';
import BasicTitle from '../../components/elements/Input/BasicTitle';
import SplashScreen from '../SplashScreen'
import { connect } from 'react-redux';
import {loginSuccess} from '../../actions';
import Back from '../../../assets/svgs/Back';
import styles from './styles';
import PhoneInput from "react-native-phone-input";
import AppIntroSlider from 'react-native-app-intro-slider';
// import {ENDPOINT} from 'app/configs';

const slides=[
  {
    key:'satu',
    title:'Title 1',
    text: 'L-Fix partners are professional partners who have \n been recognized in their fields. ',
    image: require('../../../assets/images/carousel.jpeg'),
    backgroundColor: '#FFFFFF'
  },
  {
    key:'dua',
    title:'Title 2',
    text: 'Ready to come for maintain and repair your \n electronics stuff',
    image: require('../../../assets/images/samsung.jpg'),
    // backgroundColor: '#FFFFFF'
  }
];
class Component extends React.Component {
    state = {
      email : '',
      password : '',
      value: '',
      phoneCode: '',
      isSplashScreen : true,
      showRealApp:false
    }

  //  handlePress = async () => {
  //   const data = { email : this.state.email,
  //     password: this.state.password};
  //   const strData  = JSON.stringify(data); 
  //   await fetch('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/mobile/login', {
  //     // cdp-api-dev.vsan-apps.playcourt.id
  //     method: 'POST',
  //     body: JSON.stringify({email : this.state.email, password: this.state.password}),
  //     headers: {
  //     'Content-Type' : 'application/json', 
  //     'Authorization' : 'Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==' 
  //     }
  //   }).then(async (response) =>
  //   // console.log(response), 
  //    response.json())
  //   .then(async (responseJson) => {
  //     //Handle response
  //     console.log(responseJson);
  //     if(responseJson.success==true) {
  //       //Simpan ke reducer/redux
  //       await this.props.login(responseJson);
  //       this.props.navigation.navigate('App'); 
  //     } else {
  //       Alert.alert('Email atau Password Salah')
  //     }
  //   }).catch ((error) => {
  //     //Error Connection
  //     console.log('OnBoarding'+error)
  //     Alert.alert('Cannot Connect to Server !');
  //   })

  _renderItem = (item) => {
    return (
      <View style={{backgroundColor:'#000', flex:1}}>
        <Text style={styles.judul}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }

  componentDidMount() {
    setTimeout( () => {
      this.setState({
        isSplashScreen : false
      })
    },2000)
  }
    
  render() {
    if(this.state.isSplashScreen) {
      return <SplashScreen/>
    }
    // else if(!this.state.isSplashScreen && this.state.showRealApp==false) {
    //    return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
    // }
    return (
      
        <View style={{backgroundColor: '#ffffff', flex:1}}>
            <StatusBar
             transculent={false}
             backgroundColor='#175873'
             barStyle='light-content'
             />
            <Back style={{alignSelf:'flex-start', marginTop: 20, marginLeft : 10}} onPress={this._onBackPress}/>
            {/* <Text style={styles.title}>Measurement</Text> */}
            {/* <Setting style={{alignSelf:'flex-end'}}></Setting> */}
              <View style={styles.circle}/>
              <Image style={styles.lock} source={require('../../../assets/images/lock.png')}/>
              <Text style={{paddingTop:110, paddingLeft:30, fontFamily:'roboto', fontSize:24, fontWeight:'bold', color:'#000000'}}>Enter your registered phone
              number to login.</Text>
              <View style={{marginTop:30, marginLeft:30}}>
              <PhoneInput
                initialCountry='id'
                textStyle={{justifyContent: "center",
                borderRadius: 4,
                borderWidth: 1,
                height:30,
                width:160,
                borderColor: '#434547'}}
                flagStyle={
                  {
                    borderWidth: 1,
                    borderColor: '#434547'
                  }
                }
                ref={ref => {
                this.phone = ref;
                 }}
                 onChangePhoneNumber={() => this.setState({value: this.phone.getValue, phoneCode: this.phone.getCountryCode})}/>
              {/* <Text>{this.state.phoneCode}</Text> */}
              </View>
              <View style={styles.button}>
                <Button title="login" disabled={false} onPress={ () => this.props.navigation.navigate('Verification')}
                type="raised-ripple" />
              </View>
            </View>
        
        /* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#000000' }}>
          <BasicTitle label='Email' editable={true} value={this.state.email}
          onChangeText={email => this.setState({email})} />
          <BasicTitle label='Password' editable={true} value={this.state.password} 
          onChangeText={password => this.setState({password})}/>
          <View style={{marginTop: 30}}>
          <Button title="login" disabled={false} onPress={this.handlePress}
          type="raised-ripple" />
          </View>
        </View> */
      
    );
  }
}

Component.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => {

  return {
    //  status: state.isLogged,
    // akun : state.isLogged.akun,
    user : state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    login : (data) => dispatch(loginSuccess(data))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
