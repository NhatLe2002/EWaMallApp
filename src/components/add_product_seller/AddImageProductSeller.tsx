import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import SubTitleAddProductSeller from '../../reusables/Title/SubTitleAddProductSeller';
import { COLORS, SIZES } from '../../constant/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setProductCreateField } from '../../redux/slice/form/formCreateProductBySellerSlice';
import { IFormProductCreateState } from '../../constant/interface/formCreateProductInterface';
const AddImageProductSeller = () => {
    const [imageUris, setImageUris] = useState<string[]>([]);
    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [modalVisibleCoverImage, setModalVisibleCoverImage] = useState(false);
    const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);


    const dispatch = useDispatch<any>();
    const { productCreate, productCreateError, loading } = useSelector(
        (state: IFormProductCreateState) => state.formCreateProductReducer,
    );

    const handleAddImage = () => {
        setModalVisibleAdd(true);
    };

    const handleLaunchCamera = () => {
        launchCamera(
            { mediaType: 'photo', cameraType: 'back', saveToPhotos: true },
            (response) => {
                setModalVisibleAdd(false);
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
                        dispatch(setProductCreateField({ imagesId: "CC1FE2B1-5136-4E56-96C4-4FDF97A31D06" }));
                        dispatch(setProductCreateField({ coverImageId: "CC1FE2B1-5136-4E56-96C4-4FDF97A31D06" }));
                        dispatch(setProductCreateField({ videoId: "CC1FE2B1-5136-4E56-96C4-4FDF97A31D06" }));
                        // console.log('Test ', response.assets[0].uri);
                    }
                }
            }
        );
    };

    const handleSelectFromGallery = () => {
        launchImageLibrary(
            { mediaType: 'photo' },
            (response) => {
                setModalVisibleAdd(false);
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
                        dispatch(setProductCreateField({ imagesId: "CC1FE2B1-5136-4E56-96C4-4FDF97A31D06" }));
                        dispatch(setProductCreateField({ coverImageId: "CC1FE2B1-5136-4E56-96C4-4FDF97A31D06" }));
                        dispatch(setProductCreateField({ videoId: "CC1FE2B1-5136-4E56-96C4-4FDF97A31D06" }));
                    }
                }
            }
        );
    };
    const handleDeleteImage = (deletedImageUri: string) => {
        const indexToDelete = imageUris.indexOf(deletedImageUri);
        const updatedImageUris = [...imageUris];
        if (indexToDelete !== -1) {
            updatedImageUris.splice(indexToDelete, 1);
        }
        setImageUris(updatedImageUris);
        if (imageUris.length === 1) {
            dispatch(setProductCreateField({ imagesId: "" }));
            dispatch(setProductCreateField({ coverImageId: "" }));
            dispatch(setProductCreateField({ videoId: "" }));
            console.log(imageUris.length);
        }
    };
    const handleSelectCoverImage = () => {
        if (selectedCoverImage) {
            const selectedIndex = imageUris.findIndex(uri => uri === selectedCoverImage);
            if (selectedIndex !== -1) {
                const updatedImageUris = [...imageUris];
                updatedImageUris.splice(selectedIndex, 1);
                updatedImageUris.unshift(selectedCoverImage);
                setImageUris(updatedImageUris);
            }
            setSelectedCoverImage(null);
            setModalVisibleCoverImage(false);
        }
    }

    //Reder
    const renderImageItem = ({ item }: { item: string }) => (
        <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => { setSelectedCoverImage(item), setModalVisibleCoverImage(true) }}>
                <Image source={{ uri: item }} style={styles.image} />
            </TouchableOpacity>
            <Pressable style={styles.cancelButton} onPress={() => handleDeleteImage(item)}>
                <MaterialIcons name="cancel" size={10} color="gray" />
            </Pressable>
        </View>
    );

    const renderAddImageButton = () => (
        <TouchableOpacity style={styles.imageButton} onPress={handleAddImage}>
            <Text style={styles.buttonText}>Thêm ảnh</Text>
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}>
                <SubTitleAddProductSeller title='Hình ảnh, Video sản phẩm *' />
            </View>
            <View style={{ marginBottom: 5 }}>
                <FlatList
                    scrollEnabled={false}
                    data={[...imageUris, 'addButton']}
                    renderItem={({ item }) => item === 'addButton' ? renderAddImageButton() : renderImageItem({ item })}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            {imageUris[0] != null ? (<View style={styles.coverImageContainer}>
                <View style={{
                    width: '23.5%',
                    aspectRatio: 10 / 10,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    paddingHorizontal: 10,
                    marginHorizontal: 3
                }}>
                    <Image source={{ uri: imageUris[0] }} style={styles.image} />
                </View>
            </View>) : ("")}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleAdd}
                onRequestClose={() => {
                    setModalVisibleAdd(!modalVisibleAdd);
                }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Chọn hành động</Text>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={handleLaunchCamera}>
                            <Text style={styles.textStyle}>Chụp ảnh</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSelectFromGallery}>
                            <Text style={styles.textStyle}>Chọn từ thư viện</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisibleAdd(!modalVisibleAdd)}>
                            <Text style={styles.textStyle}>Đóng</Text>
                        </Pressable>
                        {/* {imageUris.length } */}

                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleCoverImage}
                onRequestClose={() => {
                    setModalVisibleCoverImage(!modalVisibleCoverImage);
                }}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Chọn hành động</Text>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={handleSelectCoverImage}>
                            <Text style={styles.textStyle}>Chọn làm ảnh bìa</Text>
                        </Pressable>
                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisibleCoverImage(!modalVisibleCoverImage)}>
                            <Text style={styles.textStyle}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddImageProductSeller;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    listContainer: {
        marginTop: 20,
        marginHorizontal: 10,
        justifyContent: 'space-around'
    },

    imageButton: {
        marginTop: 5,
        width: '23.5%',
        height: 0,
        aspectRatio: 10 / 10,
        borderRadius: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed'
    },
    buttonText: {
        color: 'red',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    //ImageList
    //ImageList
    imageContainer: {
        width: '23.5%',
        height: 0,
        aspectRatio: 10 / 10,
        borderWidth: 1,
        borderColor: COLORS.gray,
        paddingHorizontal: 10,
        marginHorizontal: 3,
        marginTop: 5
    },
    image: {
        width: '100%',
        height: '100%',
    },
    cancelButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },

    //Cover Image
    coverImageContainer: {
        marginTop: 10,
        paddingVertical: 10,
        marginHorizontal: 10,
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: 'gray'
    }
});
