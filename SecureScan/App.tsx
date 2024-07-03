import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, NativeModules, TouchableOpacity } from 'react-native';

const bannedAppsList = [
  'com.zhiliaoapp.musically', // TikTok
  'com.lenovo.anyshare.gps',  // SHAREit
  'com.smile.gifmaker',       // KWAI
  'com.zzkko',                // SHEIN
  'com.baidu.BaiduMap',       // Baidu Map
  'com.hcg.cok.gp',           // Clash of Kings
  'com.dianxinos.dxbs',       // DU Battery Saver
  'com.helo.ma',              // Helo
  'video.like',               // Likee
  'com.cyberlink.youcammakeup', // YouCam Makeup
  'com.mi.global.bbs',        // Mi Community
  'com.ksmobile.cb',          // CM Browser
  'com.igniteap.viruscleaner', // Virus Cleaner
  'com.apusapps.browser',     // APUS Browser
  'com.zzkko',                // ROMWE
  'com.club.factory',         // Club Factory
  'com.newsdog',              // NewsDog
  'com.commsource.beautyplus', // Beauty Plus
  'com.tencent.mm',           // WeChat
  'com.uc.browser.en',        // UC Browser
  'com.tencent.androidqqmail', // QQ Mail
  'com.sina.weibo',           // Weibo
  'cn.xender',                // Xender
  'com.tencent.qqmusic',      // QQ Music
  'com.tencent.news',         // QQ News
  'sg.bigo.live',             // Bigo Live
  'com.meitu.wheecam',        // SelfieCity
  'com.netease.mail',         // Mail Master
  'com.lbe.parallel.intl',    // Parallel Space
  'com.mi.videocall',         // Mi Video Call - Xiaomi
  'com.we.sync',              // WeSync
  'com.estrongs.android.pop', // ES File Explorer
  'com.quvideo.xiaoying',     // VivaVideo - QU Video Inc
  'com.meelive.ingkee',       // Meel TU
  'co.aisle',                 // Aisle
  'com.coffeemeetsbagel',     // Coffee Meets Bagel
  //'com.whatsapp',             // WhatsApp
  //'com.facebook.katana',      // Facebook
];

const { InstalledApps } = NativeModules;

type AppInfo = {
  packageName: string;
  appName: string;
};

const App = () => {
  const [scanResult, setScanResult] = useState<AppInfo[] | null>(null);

  const scanForBannedApps = async () => {
    try {
      const installedApps: AppInfo[] = await InstalledApps.getInstalledApps();
      const foundBannedApps = installedApps.filter(app => bannedAppsList.includes(app.packageName));
      setScanResult(foundBannedApps);
    } catch (error) {
      console.error("Error scanning for banned apps: ", error);
    }
  };

  const renderScanAgainButton = () => {
    return (
      <TouchableOpacity style={styles.scanAgainButton} onPress={scanForBannedApps}>
        <Text style={styles.buttonText}>Scan Again</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SecureScan</Text>
      </View>
      {scanResult === null ? (
        <TouchableOpacity style={styles.scanButton} onPress={scanForBannedApps}>
          <Text style={styles.buttonText}>Scan Now</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.resultContainer}>
          {scanResult.length > 0 ? (
            <FlatList
              data={scanResult}
              keyExtractor={(item) => item.packageName}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text style={styles.appText}>{item.appName}</Text>
                </View>
              )}
            />
          ) : (
            <View style={styles.noAppContainer}>
              <Text style={styles.noAppText}>No app found from the banned app list</Text>
            </View>
          )}
          {renderScanAgainButton()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2d4f7c',
    padding: 16,
    alignItems: 'center',
    //borderBottomLeftRadius: 20,
    //borderBottomRightRadius: 20,
    zIndex: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scanButton: {
    backgroundColor: '#2d4f7c',
    paddingVertical: 12,
    paddingHorizontal: 42,
    borderRadius: 25,
    marginTop: 80,  // Adjusted to accommodate the header
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
  resultContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 16,
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  appText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d4f7c',
    textAlign: 'center',
  },
  noAppContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noAppText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  scanAgainButton: {
    backgroundColor: '#2d4f7c',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginTop: 20,
  },
});

export default App;
