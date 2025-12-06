import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
  FadeInUp,
  FadeIn,
  FadeInRight,
  ZoomIn,
} from 'react-native-reanimated';

// Animated Card Component with 3D effects
export const AnimatedCard = ({ children, delay = 0, style }: any) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).springify().damping(15)}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// Animated Button Component with press effects
export const AnimatedButton = ({ children, onPress, style, delay = 0 }: any) => {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.3);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      shadowOpacity: shadowOpacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15 });
    shadowOpacity.value = withTiming(0.5, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
    shadowOpacity.value = withTiming(0.3, { duration: 100 });
  };

  return (
    <Animated.View
      entering={ZoomIn.delay(delay).springify().damping(15)}
    >
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={style}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

// Animated Service Card with 3D tilt effect
export const AnimatedServiceCard = ({ children, onPress, index = 0, style }: any) => {
  const scale = useSharedValue(1);
  const rotateY = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const translateZ = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateY: `${rotateY.value}deg` },
        { rotateX: `${rotateX.value}deg` },
        { translateZ: translateZ.value },
        { perspective: 1000 },
      ],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.92, { damping: 12 });
    translateZ.value = withSpring(-10, { damping: 12 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
    translateZ.value = withSpring(0, { damping: 12 });
    rotateY.value = withSpring(0, { damping: 12 });
    rotateX.value = withSpring(0, { damping: 12 });
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 100).springify().damping(15)}
      style={style}
    >
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

// Animated Header Component
export const AnimatedHeader = ({ children, style }: any) => {
  return (
    <Animated.View
      entering={FadeInDown.duration(800).springify()}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// Animated Text Component
export const AnimatedText = ({ children, delay = 0, style }: any) => {
  return (
    <Animated.Text
      entering={FadeIn.delay(delay).duration(600)}
      style={style}
    >
      {children}
    </Animated.Text>
  );
};

// Animated List Item
export const AnimatedListItem = ({ children, index = 0, style }: any) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 100).springify()}
      style={style}
    >
      {children}
    </Animated.View>
  );
};

// Animated Input Card with 3D effect
export const AnimatedInputCard = ({ children, delay = 0, style }: any) => {
  const scale = useSharedValue(1);
  const rotateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateY: `${rotateY.value}deg` },
        { perspective: 1000 },
      ],
    };
  });

  return (
    <Animated.View
      entering={FadeInUp.delay(delay).springify().damping(15)}
      style={style}
    >
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

