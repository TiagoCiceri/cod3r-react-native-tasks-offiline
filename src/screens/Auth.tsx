import React, { Component } from 'react'
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Platform, Alert } from 'react-native'
import axios from 'axios'

import backgroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'
import AuthInput from '../components/Authinput'
import { server, showError, showSuccess } from '../common'

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {
    
    state = {
        ...initialState
    }

    signinOrSingup = () => {
        if (this.state.stageNew) {
            this.signup()
        }else{
            Alert.alert('Sucesso!','Logar')
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastro!')
            this.setState({ ...initialState })
        } catch (e) {
            showError(e)
        }
    }

    testeBackEnd = async () => {
        try {
            Alert.alert('Sucesso!','teste backend')    
            await axios.get(`${server}/teste`).then((res) => {
                showSuccess('Teste com backend executado com sucesso! '+res.data)
            })
                       
        } catch(e) {
            showError(e)
        }
    }

    render() {
        return(
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}> Tasks </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados' }
                    </Text>
                    {this.state.stageNew && 
                        <AuthInput icon='user' 
                            placeholder='Nome' 
                            value={this.state.name} 
                            style={styles.input}                              
                            onChangeText={name => this.setState({ name })} />                   
                    }
                    <AuthInput icon='at'
                        placeholder='E-mail' 
                        value={this.state.email} 
                        style={styles.input}  
                        onChangeText={email => this.setState({ email })} />
                    <AuthInput icon='lock' 
                        placeholder='Senha' 
                        value={this.state.password} 
                        style={styles.input}  
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })} />

                    {this.state.stageNew && 
                        <AuthInput icon='lock' 
                            placeholder='Confirme a Senha' 
                            value={this.state.confirmPassword} 
                            style={styles.input}  
                            secureTextEntry={true}
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} />                    
                    }

                    <TouchableOpacity onPress={this.signinOrSingup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                               {this.state.stageNew ? 'Registrar' : 'Entrar' }
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={{ padding: 10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?' }
                        </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{ padding: 15 }}
                    onPress={this.testeBackEnd}>
                        <Text style={styles.buttonText}>
                        Teste requisição backend
                        </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        flex: 1,     
        width   : '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        width: '90%',
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: Platform.OS === 'ios' ? 15 : 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,

    }
})