import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  useResetFlow,
  PerformanceMeasureView,
  GestureResponderEvent,
} from '@shopify/react-native-performance';

function ScreenA(): JSX.Element {
  const {resetFlow, componentInstanceId} = useResetFlow();
  const [resetId, setResetId] = useState(0);

  console.log('rendered ScreenA');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const reRenderScreen = (event: GestureResponderEvent) => {
    resetFlow({
      destination: 'ScreenA',
      source: 'ScreenA',
      uiEvent: event,
      renderTimeoutMillisOverride: 7000,
    });

    console.log('Re-rendering screen');

    setResetId(resetId + 1);
  };

  return (
    <PerformanceMeasureView
      componentInstanceId={componentInstanceId}
      screenName="ScreenA"
      renderPassName="ScreenA"
      interactive={true}>
      <SafeAreaView style={backgroundStyle}>
        <View style={styles.contentsContainer}>
          <TouchableOpacity style={styles.button} onPress={reRenderScreen}>
            <Text style={styles.rerenderButton}>Rerender</Text>
          </TouchableOpacity>

          <View style={styles.resetCounterContainer}>
            <Text style={styles.resetId}>{resetId}</Text>
          </View>
        </View>
      </SafeAreaView>
    </PerformanceMeasureView>
  );
}

const styles = StyleSheet.create({
  contentsContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    width: 100,
  },
  rerenderButton: {
    fontSize: 20,
    color: 'black',
  },
  resetCounterContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetId: {
    fontSize: 14,
    color: 'white',
  },
});

export default ScreenA;
