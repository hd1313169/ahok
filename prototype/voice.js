/* ============================================================
   語音播放（真實可用：瀏覽器內建 Web Speech API，非裝飾用）
   語言選擇透過 localStorage 在頁面間保留，對應 08-voice-settings.html
   ============================================================ */

(function () {
  var STORAGE_KEY = 'impeccable-voice-lang';

  function getLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'zh';
    } catch (e) {
      return 'zh';
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage 不可用時，僅本頁記得選擇，不跨頁保留 */
    }
  }

  function speechLangTag(lang) {
    // 瀏覽器 TTS 普遍支援中文（zh-TW），台語（閩南語）語音支援度低，
    // 嘗試 nan-TW，若裝置不支援會自動退回系統預設語音朗讀，不會出錯。
    return lang === 'tw' ? 'nan-TW' : 'zh-TW';
  }

  var playingBtn = null;
  var playingAudio = null;

  function stopPlaying() {
    window.speechSynthesis.cancel();
    if (playingAudio) {
      playingAudio.pause();
      playingAudio = null;
    }
    if (playingBtn) {
      playingBtn.classList.remove('is-playing');
      playingBtn = null;
    }
  }

  // 音檔路徑依 voice-scripts.md 的代號規則：prototype/audio/<代號>.wav
  function audioSrcFor(code) {
    return code ? 'audio/' + code + '.wav' : null;
  }

  // 播放預先錄製的音檔；找不到檔案（404 / 載入失敗）時 fallback 回 speechSynthesis
  function playAudioFile(src, fallbackText, onDone, langTag) {
    var audio = new Audio(src);
    var usedFallback = false;
    audio.addEventListener('error', function () {
      if (usedFallback) return;
      usedFallback = true;
      speak(fallbackText, onDone, langTag);
    });
    audio.addEventListener('ended', function () {
      if (playingAudio === audio) playingAudio = null;
      if (onDone) onDone();
    });
    playingAudio = audio;
    audio.play().catch(function () {
      if (usedFallback) return;
      usedFallback = true;
      speak(fallbackText, onDone, langTag);
    });
    return audio;
  }

  function speak(text, onDone, langTag) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = langTag || speechLangTag(getLang());
    utter.rate = 0.92;
    utter.pitch = 1;
    if (onDone) {
      utter.onend = onDone;
      utter.onerror = onDone;
    }
    window.speechSynthesis.speak(utter);
    return utter;
  }

  function updateSpeakButtonsAvailability() {
    var supported = 'speechSynthesis' in window;
    document.querySelectorAll('[data-speak]').forEach(function (btn) {
      if (!supported) {
        btn.setAttribute('disabled', 'disabled');
        btn.setAttribute('aria-label', '此瀏覽器不支援語音播放');
      }
    });
  }

  // 點擊播放；播放中的按鈕再點一次會停止。icon 的播放/停止切換純靠 CSS
  // 的 .is-playing class（見 styles.css），這裡只負責狀態管理。
  function bindSpeakButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-speak]');
      if (!btn) return;

      if (btn === playingBtn) {
        stopPlaying();
        return;
      }

      var text = btn.getAttribute('data-speak');
      var code = btn.getAttribute('data-speak-code');
      // data-speak-locale：鎖定此按鈕永遠用該語言，不受長輩端語音設定影響（家屬端 05/06 用，固定中文）
      // data-speak-audio-lang：這顆音檔本身錄的是哪個語言，預設 tw（目前提供的音檔都是台語錄音）
      var locale = btn.getAttribute('data-speak-locale');
      var effectiveLang = locale || getLang();
      var audioLang = btn.getAttribute('data-speak-audio-lang') || 'tw';

      if (playingBtn) playingBtn.classList.remove('is-playing');
      playingBtn = btn;
      btn.classList.add('is-playing');

      var clearIfCurrent = function () {
        if (playingBtn === btn) {
          btn.classList.remove('is-playing');
          playingBtn = null;
        }
      };

      // 音檔語言跟目前生效的語言一致時才播放預錄音檔，否則用瀏覽器 TTS 唸出目前生效語言
      if (code && audioLang === effectiveLang) {
        playAudioFile(audioSrcFor(code), text, clearIfCurrent, speechLangTag(effectiveLang));
        return;
      }

      var utter = speak(text, clearIfCurrent, speechLangTag(effectiveLang));
      if (!utter) {
        clearIfCurrent();
      }
    });
  }

  function updateVoiceLangLabel() {
    var label = document.querySelector('[data-voice-lang-label]');
    if (!label) return;
    label.textContent = getLang() === 'tw' ? '台語語音' : '中文語音';
  }

  // 供 08-voice-settings.html 呼叫，切換並記住語言選擇
  window.ImpeccableVoice = {
    speak: speak,
    getLang: getLang,
    setLang: function (lang) {
      setLang(lang);
      updateVoiceLangLabel();
    },
  };

  function bindVoiceSettingRadios() {
    var zh = document.getElementById('voice-zh');
    var tw = document.getElementById('voice-tw');
    if (!zh || !tw) return;
    (getLang() === 'tw' ? tw : zh).checked = true;
    zh.addEventListener('change', function () { if (zh.checked) window.ImpeccableVoice.setLang('zh'); });
    tw.addEventListener('change', function () { if (tw.checked) window.ImpeccableVoice.setLang('tw'); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    bindSpeakButtons();
    updateSpeakButtonsAvailability();
    updateVoiceLangLabel();
    bindVoiceSettingRadios();
  });
})();
