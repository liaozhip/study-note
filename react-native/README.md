# react-native
关于 react-native 的学习笔记

### 指定 android jdk 编译版本 `android/build.gradle`
```java
  android {
      compileOptions {
          sourceCompatibility JavaVersion.VERSION_11
          targetCompatibility JavaVersion.VERSION_11
      }
  }
```

### 设置代理加快下载速度 `gradle.properties`
```java
  systemProp.https.proxyHost=localhost
  systemProp.https.proxyPort=4780
  systemProp.http.proxyHost=localhost
  systemProp.http.proxyPort=4780
```
