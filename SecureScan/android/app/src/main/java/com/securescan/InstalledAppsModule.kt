package com.securescan

import android.content.pm.PackageManager
import android.content.pm.PackageInfo
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap

class InstalledAppsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "InstalledApps"
    }

    @ReactMethod
    fun getInstalledApps(promise: Promise) {
        try {
            val pm: PackageManager = reactApplicationContext.packageManager
            val packages: List<PackageInfo> = pm.getInstalledPackages(PackageManager.GET_META_DATA)
            val appList: WritableArray = WritableNativeArray()

            for (packageInfo in packages) {
                val app = WritableNativeMap()
                app.putString("packageName", packageInfo.packageName)
                app.putString("appName", packageInfo.applicationInfo.loadLabel(pm).toString())
                appList.pushMap(app)
            }

            promise.resolve(appList)
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }
}
