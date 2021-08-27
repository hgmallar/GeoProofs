import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  LogBox,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements';
import MathView, {MathText} from 'react-native-math-view';
import DraggableFlatList from 'react-native-draggable-flatlist';

const windowHeight = Dimensions.get('window').height;
const proofHeight = windowHeight - 200 - 50;

class App extends Component {
  state = {
    statements: [
      `\\text{Quadrilateral } ABCD`,
      `E \\text{ and } F \\text{ are points on } \\overline{BC} \\text{ and } \\overline{AD}`,
      `\\overline{AGC} \\text{ and } \\overline{EGF} \\text{ are drawn}`,
      `\\angle DAC \\cong \\angle BCA`,
      `\\overline{AD} \\cong \\overline{CB}`,
      `\\overline{BE} \\cong \\overline{DF}`,
    ],
    reasons: [
      '\\text{Given}',
      '\\text{Given}',
      '\\text{Given}',
      '\\text{Given}',
      '\\text{Given}',
      '\\text{Given}',
    ],
  };

  renderItem = ({item, index, drag, isActive}) => {
    const textLine = `${index + 1}) ${item}`;
    return (
      <TouchableOpacity
        style={{
          height: 80,
          backgroundColor: isActive ? '#12232E' : '#007CC7',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          borderColor: '#12232E',
          borderBottomWidth: 1,
          margin: 0,
        }}
        onLongPress={drag}>
        <MathView
          color={'white'}
          fontSize={6}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            fontSize: 10,
            marginLeft: 5,
          }}
          math={textLine}
        />

        {/* <MathText
          direction="ltr"
          value={`${index + 1}) ${item}`}
          color={'white'}
          fontSize={6}
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            fontSize: 10,
            padding: 0,
            margin: 0,
          }}
          CellRendererComponent={
            <Text
              style={{
                textAlign: 'left',
                textAlignVertical: 'bottom',
                color: 'white',
                fontSize: 16,
                fontFamily: 'serif',
                paddingHorizontal: 5,
              }}
            />
          }
        /> */}
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('./images/proof1.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.headerRow}>
          <Text style={styles.leftHeaderStyle}>Statements</Text>
          <Text style={styles.rightHeaderStyle}>Reasons</Text>
        </View>
        <View style={styles.table}>
          <DraggableFlatList
            data={this.state.statements}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `statement-${index}`}
            scrollPercent={5}
            onDragEnd={({data}) => this.setState({statements: data})}
            containerStyle={{borderRightColor: 'black', borderRightWidth: 2}}
          />
          <DraggableFlatList
            data={this.state.reasons}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => `reason-${index}`}
            scrollPercent={5}
            onDragEnd={({data}) => this.setState({reasons: data})}
            containerStyle={{borderLeftColor: 'black', borderLeftWidth: 2}}
          />
        </View>
        <View style={styles.btnRow}>
          <Button
            title="Submit"
            buttonStyle={styles.btnStyle}
            onPress={() => Alert.alert('Simple Button pressed')}
          />
          <Button
            title="Next"
            buttonStyle={styles.btnStyle}
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
]);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxHeight: 200,
  },
  headerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxHeight: 24,
  },
  leftHeaderStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderRightColor: 'black',
    borderBottomColor: 'black',
    borderRightWidth: 2,
    borderBottomWidth: 4,
    width: '50%',
  },
  rightHeaderStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    borderLeftColor: 'black',
    borderBottomColor: 'black',
    borderLeftWidth: 2,
    borderBottomWidth: 4,
    width: '50%',
  },
  table: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007CC7',
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxHeight: proofHeight,
  },
  btnRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxHeight: 50,
  },
  btnStyle: {
    backgroundColor: '#203647',
    width: 100,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
