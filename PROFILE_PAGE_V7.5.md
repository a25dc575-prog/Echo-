# Echo 音樂社交平台 - V7.5 升級文檔

## 🎨 重大更新：品牌色彩升級 + 完整個人頁面

### 📊 版本資訊
- **版本號**：V7.5
- **發布日期**：2024-12-24
- **核心升級**：品牌色從 Spotify 綠改為 Cyber Teal + 沉浸式個人頁面

---

## 🌈 品牌核心色升級

### 新品牌色：Cyber Teal（電光藍綠）
```css
--echo-primary: #17D1C1
```

### 色彩應用範圍
| 元素類型 | 日間模式 | 夜間模式 |
|---------|---------|----------|
| 主要按鈕 | #17D1C1 | #17D1C1 |
| 互動元素 | #17D1C1 | #17D1C1 |
| 強調文字 | #17D1C1 | #17D1C1 |
| 進度條 | #17D1C1 | #17D1C1 |
| 圖表主色 | #17D1C1 | #17D1C1 |

### 視覺特點
- **更具科技感**：藍綠色調比綠色更符合音樂科技平台定位
- **高對比度**：在深色和淺色背景都能保持清晰可見
- **品牌識別度**：獨特的色調區隔於其他音樂平台

---

## 👤 全新個人頁面功能

### 1. 封面與頭像系統

#### 封面圖片
- **尺寸**：1200x400px
- **特效**：從底部到頂部的漸變遮罩
- **功能**：點擊編輯按鈕可更換封面

#### 個人頭像
- **尺寸**：桌面 160x160px，移動端 128x128px
- **邊框**：4px 白色/卡片色邊框
- **浮動效果**：頭像懸浮在封面圖片上方
- **音樂徽章**：右下角圓形音樂圖標徽章

### 2. 個人資料展示

#### 基本資訊
```typescript
interface UserProfile {
  name: string;          // 顯示名稱
  username: string;      // @用戶名
  bio: string;          // 個人簡介
  location: string;     // 所在地
  joinDate: string;     // 加入日期
}
```

#### 統計數據卡片（5格網格）
| 統計項目 | 日文 | 英文 | 圖標色彩 |
|---------|------|------|---------|
| 總曲目數 | 総トラック数 | Total Tracks | Cyber Teal |
| 聆聽時數 | 再生時間 | Listening Hours | Cyber Teal |
| 最愛藝人 | お気に入りアーティスト | Favorite Artists | Cyber Teal |
| 追蹤者 | フォロワー | Followers | Cyber Teal |
| 追蹤中 | フォロー中 | Following | Cyber Teal |

### 3. 音樂曲風分布圖

#### 圖表類型：環形圖（Doughnut Chart）
使用 Recharts 的 PieChart 組件：
- **內圈半徑**：60px
- **外圈半徑**：100px
- **區塊間距**：2度
- **標籤顯示**：曲風名稱 + 百分比

#### 預設曲風配色
```typescript
const genreColors = {
  'J-Pop': '#17D1C1',      // Cyber Teal
  'Electronic': '#8B5CF6', // Purple
  'Rock': '#F59E0B',       // Amber
  'Jazz': '#EC4899',       // Pink
  'Indie': '#10B981',      // Emerald
  'Classical': '#3B82F6', // Blue
};
```

#### 圖表互動
- **懸停提示**：顯示曲風名稱和精確百分比
- **圖例位置**：底部水平排列
- **響應式**：自動適配容器大小

### 4. 喜歡的音樂列表

#### 卡片設計
```
┌────────────────────────────────────────┐
│ [封面] 歌曲名稱              3:24      │
│        藝人 • 專輯           247 plays │
└────────────────────────────────────────┘
```

#### 互動效果
- **懸停**：背景變色 + 播放圖標浮現
- **點擊**：（預留）播放歌曲功能
- **封面尺寸**：56x56px 圓角

#### 顯示資訊
- 歌曲名稱（粗體）
- 藝人 • 專輯（次要文字）
- 播放時長
- 播放次數統計

### 5. 最近播放記錄

#### 網格佈局
- **桌面**：4列網格
- **平板**：2列網格
- **手機**：1列網格

#### 卡片內容
```
┌──────────┐
│          │  歌曲名稱
│  封面    │  藝人名稱
│          │  🕐 2 minutes ago
└──────────┘
```

#### 特殊元素
- **時間戳記**：相對時間（2 minutes ago, 1 hour ago）
- **播放按鈕**：懸停時顯示圓形綠色按鈕
- **方形封面**：1:1 比例，圓角卡片

---

## 🎯 技術架構

### 新增組件

#### `/src/app/components/ProfilePage.tsx`
- **主組件**：完整個人頁面
- **依賴**：recharts, lucide-react
- **狀態管理**：使用 mockUserProfile 靜態數據

### 新增資料結構

#### `/src/app/data/mockData.ts`
```typescript
export interface Track {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  album: string;
  duration: string;
  playCount?: number;
  lastPlayed?: string;
}

export interface GenreDistribution {
  genre: string;
  percentage: number;
  color: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  joinDate: string;
  stats: {
    totalTracks: number;
    totalListeningHours: number;
    favoriteArtists: number;
    followers: number;
    following: number;
  };
  genreDistribution: GenreDistribution[];
  likedTracks: Track[];
  recentlyPlayed: Track[];
}
```

### 更新的翻譯鍵值

#### 日文（JP）
```typescript
myProfile: 'マイプロフィール',
editProfile: '編集',
followers: 'フォロワー',
following: 'フォロー中',
totalTracks: '総トラック数',
listeningHours: '再生時間',
favoriteArtists: 'お気に入りアーティスト',
likedMusic: 'いいね！した音楽',
recentlyPlayed: '最近再生した',
genreDistribution: '音楽ジャンル分布',
playCount: '再生回数',
plays: '回',
viewAll: 'すべて見る',
joinedOn: '参加日',
```

#### 英文（EN）
```typescript
myProfile: 'My Profile',
editProfile: 'Edit',
followers: 'Followers',
following: 'Following',
totalTracks: 'Total Tracks',
listeningHours: 'Listening Hours',
favoriteArtists: 'Favorite Artists',
likedMusic: 'Liked Music',
recentlyPlayed: 'Recently Played',
genreDistribution: 'Genre Distribution',
playCount: 'Play Count',
plays: 'plays',
viewAll: 'View All',
joinedOn: 'Joined on',
```

---

## 📱 響應式設計

### 斷點策略

| 裝置類型 | 寬度範圍 | 封面高度 | 頭像大小 | 統計網格 |
|---------|---------|---------|---------|---------|
| 手機 | < 768px | 256px | 128px | 2列 |
| 平板 | 768-1024px | 320px | 160px | 5列 |
| 桌面 | > 1024px | 320px | 160px | 5列 |

### 佈局調整
- **封面**：移動端高度降低 20%
- **頭像**：移動端縮小至 128x128px
- **統計卡片**：手機端 2列，其他 5列
- **內容區**：桌面雙欄，移動端單欄

---

## 🎨 視覺設計指南

### 色彩層級
```css
/* Primary Actions */
.primary-action {
  background: #17D1C1;
  color: #FFFFFF;
}

/* Secondary Actions */
.secondary-action {
  background: var(--secondary);
  color: var(--secondary-foreground);
}

/* Stats Display */
.stat-value {
  color: #17D1C1;
  font-size: 2rem;
}
```

### 間距規範
- **容器內距**：24px (移動端)，32px (桌面端)
- **元素間距**：16px (標準)，24px (區塊間)
- **卡片圓角**：12px (小)，16px (大)

### 陰影效果
```css
/* Card Shadow (Light Mode) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Card Shadow (Dark Mode) */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

/* Hover Elevation */
box-shadow: 0 4px 12px rgba(23, 209, 193, 0.15);
```

---

## 🚀 效能優化

### 圖片載入
- **封面圖**：使用 Unsplash 優化尺寸（1200x400）
- **頭像**：200x200px 高解析度
- **曲目封面**：100x100px 縮圖
- **懶加載**：視窗外圖片延遲載入

### 圖表渲染
- **Recharts**：SVG 渲染，效能優異
- **響應式容器**：自動調整尺寸，無需手動計算
- **動畫**：僅在初次渲染時播放

### 資料管理
- **靜態資料**：使用 mockUserProfile
- **未來優化**：可接入真實 API
- **快取策略**：LocalStorage 儲存用戶偏好

---

## ✨ 互動細節

### 微動畫
1. **封面編輯按鈕**：Hover 時背景變實
2. **統計卡片**：數字跳動動畫（可選）
3. **曲目卡片**：懸停時播放按鈕淡入
4. **圖表**：扇形區塊懸停高亮

### 狀態反饋
- **載入狀態**：骨架屏或旋轉圖標
- **空狀態**：友善提示文字
- **錯誤狀態**：紅色警告訊息

---

## 📋 待辦事項（Future Enhancements）

### 功能擴展
- [ ] 封面/頭像上傳功能
- [ ] 個人資料編輯表單
- [ ] 追蹤/取消追蹤按鈕
- [ ] 社交分享功能
- [ ] 音樂播放器整合

### 資料來源
- [ ] 接入 Spotify API
- [ ] 接入 Last.fm API
- [ ] 整合 Apple Music
- [ ] 同步聆聽歷史

### 進階功能
- [ ] 年度音樂回顧（類似 Spotify Wrapped）
- [ ] 音樂品味相似度比對
- [ ] 好友音樂推薦
- [ ] 演唱會打卡歷史

---

## 🎯 總結

Echo V7.5 成功完成了品牌視覺升級和個人頁面系統的建立。新的 Cyber Teal 品牌色更符合音樂科技平台的定位，而完整的個人頁面提供了豐富的音樂統計和社交功能，為用戶提供了更沉浸式的音樂社交體驗。

**核心亮點**：
✅ 品牌色升級為 #17D1C1（Cyber Teal）  
✅ 沉浸式封面+頭像設計  
✅ 完整的音樂統計數據  
✅ 互動式曲風分布圖表  
✅ 喜歡的音樂和最近播放列表  
✅ 完整的日英雙語支援  
✅ 響應式設計全面支援

---

**版本**：V7.5  
**更新日期**：2024-12-24  
**維護團隊**：Echo Development Team
