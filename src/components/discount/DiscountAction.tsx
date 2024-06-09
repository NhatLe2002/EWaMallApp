import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, FONTS } from '../../constant/theme';

const DiscountAction: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  const handleApplyVoucher = () => {
    console.log("Applying voucher code:", voucherCode);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Feather name="credit-card" size={14} color={COLORS.primary} />
          <Text style={styles.buttonText}>Nhập mã voucher</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.button}>
          <Feather name="percent" size={14} color={COLORS.primary} />
          <Text style={styles.buttonText}>Tìm thêm voucher</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Nhập mã voucher</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập mã"
              value={voucherCode}
              onChangeText={setVoucherCode}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.applyButton]} onPress={handleApplyVoucher}>
                <Text style={styles.modalButtonText}>Áp dụng</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: FONTS.roboto_regular,
    color: COLORS.black,
    marginLeft: 5,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: COLORS.gray,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.black,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: COLORS.black,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: COLORS.black,
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: FONTS.roboto_bold,
    color: COLORS.white,
  },
});

export default DiscountAction;
