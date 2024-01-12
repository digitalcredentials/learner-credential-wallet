package app.lcw;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.json.JsonReader;

public class WalletEventReceiveModule extends ReactContextBaseJavaModule {
  // Events
  private final String CredentialReceivedEventKey = "CREDENTIAL_RECEIVED_EVENT";
  private final String CredentialReceivedEventValue = "credential_received";
  private final String DidAuthReceivedEventKey = "DID_AUTH_RECEIVED_EVENT";
  private final String DidAuthReceivedEventValue = "did_auth_received";

  // Data
  private final String CredentialKey = "CREDENTIAL";
  private final String CredentialValue = "credential";
  private final String DidAuthKey = "DID_AUTH";
  private final String DidAuthValue = "did_auth";

  // React
  private final ReactApplicationContext reactContext;

  WalletEventReceiveModule(ReactApplicationContext context) {
    super(context);
    this.reactContext = context;
  }

  @Override
  public String getName() {
    return "WalletEventReceiveModule";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(CredentialReceivedEventKey, CredentialReceivedEventValue);
    constants.put(DidAuthReceivedEventKey, DidAuthReceivedEventValue);
    constants.put(CredentialKey, CredentialValue);
    constants.put(DidAuthKey, DidAuthValue);
    return constants;
  }

  private void processData(JsonObject dataObject) {
    // Create map for data
    WritableMap payload = Arguments.createMap();

    // Get data directory
    File filesDir = this.reactContext.getFilesDir();

    try {
      if (dataObject.containsKey("credential")) {
        // Verifiable credential
        // Extract credential from data
        JsonObject data = dataObject.getJsonObject("credential")
                                    .getJsonObject("data")
                                    .getJsonArray("verifiableCredential")
                                    .getJsonObject(0);
        payload.putString(CredentialValue, data.toString());
        this.reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(CredentialReceivedEventValue, payload);
      } else {
        // DID Authentication
        // Extract did auth request from data
        JsonObject data = dataObject.getJsonObject("credentialRequestOptions")
                                    .getJsonObject("web")
                                    .getJsonObject("VerifiablePresentation");
        payload.putString(DidAuthValue, data.toString());
        this.reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(DidAuthReceivedEventValue, payload);
      }
    } catch (JsonException | IllegalStateException | ClassCastException e) {
      Log.e("WalletEventReceiveModule.processData.error", e.getMessage());
      return;
    }
  }

  @ReactMethod
  public void getData() {
    // Get current intent
    Intent intent = getCurrentActivity().getIntent();

    // Get action and type
    String action = intent.getAction();
    String type = intent.getType();

    // Only handle receiving a single text file for now
    if (!Intent.ACTION_SEND.equals(action) || !type.startsWith("text/")) {
      return;
    }

    try {
      // Retrieve data streamed from external application
      Uri dataUri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
      InputStream dataStream = this.reactContext.getContentResolver().openInputStream(dataUri);

      // Parse data into json
      JsonReader dataReader = Json.createReader(dataStream);
      JsonObject dataObject = dataReader.readObject();
      this.processData(dataObject);

      // Clear intent action after retrieving data, so as not to trigger
      // this function unecessarily on each active app state (see MainActivity#onNewIntent)
      intent.setAction(null)
               .setType(null);
    } catch (IOException e) {
      Log.e("WalletEventReceiveModule.getData.error", e.getMessage());
      return;
    }
  }

  @ReactMethod
  public void addListener(String eventName) {
    // Set up any upstream listeners or background tasks as necessary
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // Remove upstream listeners, stop unnecessary background tasks
  }
}
