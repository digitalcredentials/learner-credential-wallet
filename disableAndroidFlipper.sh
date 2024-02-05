set -x -e
# comments out flipper support for Android because it clashes with quick-crypto
sed -i '' '/implementation("com.facebook.react:flipper-integration")/s/^/\/\/ /' ./android/app/build.gradle


sed -i '' '/ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)/s/^/\/\/ /' ./android/app/src/main/java/edu/wallet/MainApplication.kt
sed -i '' '/import com.facebook.react.flipper.ReactNativeFlipper/s/^/\/\/ /' ./android/app/src/main/java/edu/wallet/MainApplication.kt
