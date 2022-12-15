import React, { useEffect, useRef } from 'react';
import { Text, ScrollView, View } from 'react-native';

import { NavHeader } from '../../components';
import dynamicStyleSheet from './ViewSourceScreen.styles';
import { ViewSourceScreenProps } from './ViewSourceScreen.d';
import { useDynamicStyles } from '../../hooks';
import { Button } from 'react-native-elements';

export default function ViewSourceScreen({ navigation, route }: ViewSourceScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const { data, screenTitle = 'View Source', onPressButton, buttonTitle } = route.params;
  const scrollRef = useRef<ScrollView>(null);
  
  function BottomButton(): JSX.Element | null {
    if (buttonTitle === undefined) return null;

    return (
      <Button
        title={buttonTitle}
        buttonStyle={styles.bottomButton}
        titleStyle={mixins.buttonTitle}
        onPress={onPressButton}
      />
    );
  }

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, []);

  return (
    <>
      <NavHeader title={screenTitle} goBack={navigation.goBack} />
      <View style={styles.container}>
        <ScrollView 
          ref={scrollRef} 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewInner}
        >
          <ScrollView horizontal contentContainerStyle={styles.scrollViewHorizontalInner}>
            <Text style={styles.codeBlock} selectable>
              {data}
            </Text>
          </ScrollView>
        </ScrollView>
        <BottomButton />
      </View>
    </>
  );
}
