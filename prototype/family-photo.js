/* ============================================================
   家族合照儲存（真實可用：透過 localStorage 在頁面間保留）
   上傳入口：09-family-settings.html
   顯示位置：02-confirmed.html 的完成徽章
   ============================================================ */

(function () {
  var KEY = 'ahok-family-photo';
  var DEMO_DEFAULT_PHOTO = '../img/success.jpg';

  // 尚未有任何紀錄（第一次開啟 prototype）時，先用示範照片展示這個功能；
  // 使用者在管理設定按下「移除照片」後，值會變成空字串，之後就一律顯示打勾 icon。
  function getPhoto() {
    var stored;
    try {
      stored = localStorage.getItem(KEY);
    } catch (e) {
      return DEMO_DEFAULT_PHOTO;
    }
    if (stored === null) {
      setPhoto(DEMO_DEFAULT_PHOTO);
      return DEMO_DEFAULT_PHOTO;
    }
    return stored;
  }

  function setPhoto(value) {
    try {
      localStorage.setItem(KEY, value || '');
    } catch (e) {
      /* localStorage 不可用時，僅本頁記得選擇，不跨頁保留 */
    }
  }

  window.AhokFamilyPhoto = { get: getPhoto, set: setPhoto };
})();
