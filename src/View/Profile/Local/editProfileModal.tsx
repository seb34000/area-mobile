import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Modal from "react-native-modal";
import { connect, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import Button from "../../../component/Button";
import getColorScheme from "../../../component/ColorsMode";
import Input from "../../../component/Input";
import api from "../../../lib/api/api";
import { logout, profile } from "../../../store/action/userAction";
 
export default function EditProfileModal({modalVisible, closeModal, setUsername, setEmail, user, email, username}: any) {
    const color = getColorScheme();

    const [editUsername, setEditUsername] = React.useState<string>('');
    const [editEmail, setEditEmail] = React.useState<string>('');
    const [editPassword, setEditPassword] = React.useState<string>('');

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const deleteProfile = async () => {
        const res = await api.deleteProfile(user.token);
        console.log(res);
        dispatch(logout());
    };

    const deleteProfileAlert = () => {
        Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, 
            {
                text: 'Delete',
                onPress: () => deleteProfile(),
                style: 'destructive'
            }
        ]);
    };

    const updateProfile = async () => {
        const res = await api.updateProfile(user.token, editUsername, editEmail, editPassword);
        if (res.status === 200) {
            if (editEmail.length > 0) 
                setEmail(editEmail);
            if (editUsername.length > 0)
                setUsername(editUsername);
        }
        closeModal();
        dispatch(profile(email, username, user.id, user.aplications));
        //@ts-ignore
        navigation.navigate('Profile');
    };


    return (
        <Modal isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={styles.container}>
            <View style={[styles.card, {backgroundColor: color.background}]}>
                <Text style={[styles.title, {color: color.text}]}>Edit Profile</Text>
                <Input placeholder='Username' onChangeText={(text) => {setEditUsername(text)}} style={styles.input} />
                <Input placeholder='Email' onChangeText={(text) => {setEditEmail(text)}} style={styles.input} />
                <Input placeholder='Password' onChangeText={(text) => {setEditPassword(text)}} style={styles.input} />
                <Text style={{padding: 5, color: color.text, fontWeight: "bold", }}>Leave field empty if you don't want to change it.</Text>
                <View style={styles.buttonLine}>
                    <Button title='Cancel' onPress={closeModal} />
                    <Button title='Delete' onPress={deleteProfileAlert} />
                    <Button title='Save' onPress={updateProfile} />
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },

    card: {
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: '600',
        padding: 5,
    },

    input: {
        width: '50%'
    },

    buttonLine: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }

})