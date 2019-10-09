import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Theme';

export const styles = StyleSheet.create({
    header: {
        color: Colors.primaryColor,
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})