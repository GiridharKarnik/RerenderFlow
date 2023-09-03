import React, {useCallback} from 'react';

import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import ScreenA from './ScreenA';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  RenderPassReport,
  PerformanceProfiler,
  LogLevel,
  PerformanceMeasureView,
} from '@shopify/react-native-performance';

function App(): JSX.Element {
  console.log('rendered App');

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onReportPrepared = useCallback((report: RenderPassReport) => {
    console.log(report);
  }, []);

  return (
    <PerformanceProfiler
      onReportPrepared={onReportPrepared}
      logLevel={LogLevel.Debug}>
      <SafeAreaView style={backgroundStyle}>
        <ScreenA />
      </SafeAreaView>
    </PerformanceProfiler>
  );
}

const styles = StyleSheet.create({});

export default App;
