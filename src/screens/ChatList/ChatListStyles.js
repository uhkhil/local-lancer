import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/Theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        flex: 1,
    },
    header: {
        color: Colors.primaryColor,
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 10
    },
    badge: {
        height: 23,
        width: 23,
        padding: 0,
        marginTop: 7
    },
    badgeText: {
        fontSize: 12
    }
});

export default styles;
