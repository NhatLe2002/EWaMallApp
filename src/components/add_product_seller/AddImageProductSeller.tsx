import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import SubTitleAddProductSeller from '../../reusables/Title/SubTitleAddProductSeller';
import { launchCamera } from 'react-native-image-picker';
import { SIZES } from '../../constant/theme';

const AddImageProductSeller = () => {
    const [imageUris, setImageUris] = useState<string[]>([]);

    const handleAddImage = () => {
        launchCamera(
            { mediaType: 'photo', cameraType: 'back', saveToPhotos: true },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorCode);
                } else if (response.errorMessage) {
                    console.log('ImagePicker ErrorMessage: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const uri = response.assets[0].uri;
                    if (uri) {
                        setImageUris([...imageUris, uri]);
                    }
                }
            }
        );
    };

    const renderImageItem = ({ item }: { item: string }) => (
        <Image source={{ uri: item }} style={styles.image} />
    );

    const renderAddImageButton = () => (
        <TouchableOpacity style={styles.imageButton} onPress={handleAddImage}>
            <Text style={styles.buttonText}>Thêm ảnh</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style = {{marginTop: 10}}>
            <SubTitleAddProductSeller title='Hình ảnh, Video sản phẩm *' />
            </View>
            <FlatList
                data={[...imageUris, 'addButton']} 
                renderItem={({ item }) => item === 'addButton' ? renderAddImageButton() : renderImageItem({ item })}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

export default AddImageProductSeller;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        justifyContent: 'space-around'
    },
    image: {
        width: '22.5%',
        height: 0, 
        aspectRatio: 9 / 10,
        borderRadius: 10,
        margin: 5,
    },
    imageButton: {
        width: '22.5%',
        height: 0, 
        aspectRatio: 9 / 10,
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle : 'dashed'
    },
    buttonText: {
        color: 'red',
        fontWeight: 'bold',
    },
});
