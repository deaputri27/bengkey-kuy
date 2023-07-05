import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import InputForm from './InputForm';

const { height, width } = Dimensions.get('window');

export default function FormMitra({ navigation }) {
    return (
        <>
            <InputForm/>
        </>
    );
}