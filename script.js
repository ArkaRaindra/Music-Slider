  const chairs = Array.from(document.querySelectorAll('.chair'));
  const counter = document.getElementById('counter');
  const titleEl = document.getElementById('title');
  const characterDescriptionEl = document.getElementById('character-description');
  const lyricsContainer = document.getElementById('lyrics-container');
  const logoEl = document.getElementById('character-logo');
  
  // Music player elements
  const playerAlbumImg = document.getElementById('player-album-img');
  const playerTrackTitle = document.getElementById('player-track-title');
  const playerTrackArtist = document.getElementById('player-track-artist');
  const progressBar = document.getElementById('progress-bar');
  const progress = document.getElementById('progress');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const playPauseBtn = document.getElementById('play-pause');
  const playIcon = document.getElementById('play-icon');
  const pauseIcon = document.getElementById('pause-icon');
  const prevTrackBtn = document.getElementById('prev-track');
  const nextTrackBtn = document.getElementById('next-track');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeLevel = document.getElementById('volume-level');
  const audioPlayer = document.getElementById('audio-player');
  
  const step = 360 / chairs.length;
  let rot = 0;
  let currentTrackIndex = 0;
  let isPlaying = false;
  let currentLyrics = [];
  let currentLyricIndex = -1;

  // Data LRC yang disimpan langsung dalam kode
  const lrcData = {
    "Pipo Password": `[00:05.00]Pipo password, pipo password
[00:10.00]Kimi no kokoro no kagi wa
[00:15.00]Pipo password, pipo password
[00:20.00]Mada mitsukaranai
[00:25.00]Demo kitto itsuka wa
[00:30.00]Kimi to deaeru to shinjiteru
[00:35.00]Sora no kanata e tobitatte
[00:40.00]Kimi no te wo tsukamu made
[00:45.00]Pipo password, pipo password
[00:50.00]Kakehiki no jikan da yo
[00:55.00]Kimi no egao mamoritai
[01:00.00]Sore dake no koto da`,

    "U & I": `[00:14.42]KIMI ga inai to nani mo dekinai yo
[00:18.95]KIMI no gohan ga tabetai yo
[00:23.36]moshi KIMI ga kaette kitara tobikkiri no egao de dakitsuku yo
[00:32.06]KIMI ga inai to ayamarenai yo
[00:36.89]KIMI no koe ga kikitai yo
[00:41.05]KIMI no egao ga mirereba sore dake de iinda yo
[00:50.43]KIMI ga soba ni iru dakede itsumo yuuki moratteta
[00:59.83]itsumade demo isshoni itai
[01:04.37]kono kimochi wo tsutaetai yo
[01:08.72]hare no hi ni mo ame no hi mo
[01:13.09]KIMI wa soba ni ite kureta
[01:18.05]me wo tojireba KIMI no egao kagayaiteru
[01:41.27]KIMI ga inai to nani mo wakaranai yo
[01:45.62]satou to shouyu wa doko dakke?
[01:50.40]moshi KIMI ga kaette kitara bikkuri saseyou to omotta no ni na
[01:58.66]KIMI ni tsui tsui amaechau yo
[02:03.71]KIMI ga yasashi sugiru kara
[02:07.92]KIMI ni moratte bakari de nani mo ageraretenai yo
[02:17.17]KIMI ga soba ni iru koto wo atarimae ni omotteta
[02:26.71]konna hibi ga zutto zutto
[02:30.74]tsuzukunda to omotteta yo
[02:35.61]GOMEN ima wa kizuita yo
[02:40.02]atarimae ja nai koto ni
[02:44.89]mazu wa KIMI ni tsutaenakucha
[02:49.24]"Arigatou" wo
[03:16.45]KIMI no mune ni todoku kana?
[03:20.92]ima wa jishin nai keredo
[03:25.64]warawanai de douka kiite
[03:30.30]omoi wo uta ni kometa kara
[03:34.84]arittake no "Arigatou"
[03:39.40]uta ni nosete todoketai
[03:44.16]kono kimochi wa zutto zutto wasurenai yo
[03:53.48]omoi yo todoke`,

    "Melancholic": `[00:02.04]全然つかめないきみのこと
[00:05.01]全然しらないうちに
[00:08.32]ココロ奪われるなんてこと
[00:11.93]あるはずないでしょ
[00:28.78]それは無愛想な笑顔だったり
[00:35.17]それは日曜日の日暮れだったり
[00:42.15]それはテスト∞（ばっか）の期間だったり
[00:48.99]それはきみとゆう名のメランコリンニスト。
[00:57.73]手当たり次第強気でぶつかっても
[00:59.77]なんにも手には残らないって思い込んでる
[01:05.26]ちょっとぐらいの勇気にだって
[01:06.96]ちっちゃくなって塞ぎこんでる
[01:08.54]わたしだから
[01:12.05]全然つかめないきみのこと
[01:15.45]全然しらないうちに
[01:18.80]|ココロ奪われるなんてこと
[01:22.36]あるはずないでしょ
[01:26.27]全然気づかないきみなんて
[01:29.21]全然知らない×知らないもん
[01:32.68]「ねぇねぇ」じゃないわ この笑顔
[01:35.95]また眠れないでしょ
[02:07.01]明日も おんなじ わたしが いるのかな
[02:13.93]無愛想で無口なままの カワいくないヤツ
[02:22.32]あの夢にきみが出てきたときから
[02:34.37]素直じゃないの だって
[02:39.29]全然つかめないきみのこと
[02:42.89]全然しらないうちに
[02:46.39]こころ奪おうとしてたのは
[02:49.72]わたしのほうだもん×××
[03:00.63]そういう時期なの
[03:02.08]おぼれたいのいとしの
[03:07.25]`,

    "Kimino Shiranai Monogatari": `[00:00.60]いつもどおりのある日の事
[00:03.32]君は突然立ち上がり言った
[00:06.49]「今夜星を見に行こう」
[00:18.37]
[00:29.76]「たまには良いこと言うんだね」
[00:32.52]なんてみんなして言って笑った
[00:35.33]明かりもない道を
[00:41.35]バカみたいにはしゃいで歩いた
[00:43.80]抱え込んだ孤独や不安に
[00:47.11]押しつぶされないように
[00:55.44]真っ暗な世界から見上げた
[01:01.70]夜空は星が降るようで
[01:08.54]いつからだろう 君の事を
[01:15.22]追いかける私がいた
[01:20.07]どうかお願い
[01:22.91]驚かないで聞いてよ
[01:28.73]私のこの想いを
[01:38.51]
[01:42.42]「あれがデネブ、アルタイル、ベガ」
[01:45.13]君は指さす夏の大三角
[01:48.01]覚えて空を見る
[01:53.94]やっと見つけた織姫様
[01:56.78]だけどどこだろう彦星様
[01:59.80]これじゃひとりぼっち
[02:08.28]楽しげなひとつ隣の君
[02:14.19]私は何も言えなくて
[02:21.15]本当はずっと君の事を
[02:28.04]どこかでわかっていた
[02:32.99]見つかったって
[02:35.84]届きはしない
[02:38.71]だめだよ 泣かないで
[02:45.30]
[02:47.59]そう言い聞かせた
[02:52.79]
[02:55.25]強がる私は臆病で
[02:58.22]興味がないようなふりをしてた
[03:02.22]だけど
[03:07.14]胸を刺す痛みは増してく
[03:09.88]ああそうか 好きになるって
[03:12.14]こういう事なんだね
[03:20.45]
[03:48.18]どうしたい? 言ってごらん
[03:53.94]心の声がする
[03:59.84]君の隣がいい
[04:05.69]真実は残酷だ
[04:12.59]言わなかった
[04:15.55]言えなかった
[04:18.74]二度と戻れない
[04:24.01]あの夏の日
[04:27.14]きらめく星
[04:31.06]今でも思い出せるよ
[04:35.55]笑った顔も
[04:38.45]怒った顔も
[04:41.40]大好きでした
[04:44.66]おかしいよね
[04:47.40]わかってたのに
[04:50.19]君の知らない
[04:53.16]私だけの秘密
[04:59.18]夜を越えて
[05:01.87]遠い思い出の君が
[05:07.72]指をさす
[05:11.57]
[05:13.62]無邪気な声で
[05:15.82]`,

    "Sakura Mitsutsuki": `[00:00.00] 
[00:10.30]Haru no yoru, hitori datta
[00:15.62]MONOKURO no sora
[00:18.46]Tameiki ga kieteku
[00:21.11]Ashibaya na hito no nami
[00:26.47]Tada mitsumete sa
[00:28.87]Zutto matteitanda
[00:32.63] 
[00:36.96]Sakura aitemo mada samui yoru ni wa omoidasun da
[00:45.17]Kimi no kao wo 'Heiki na no?'
[00:49.05]'Daijoubu sa' fuzakete te wo furu boku
[00:53.27]Ano hi kimi to kawashita yakusoku
[00:58.55]Bokura wa
[01:00.00]Bokura wa
[01:01.23]Ano kaketa tsuki no
[01:03.99]Hanbun wo sagashite
[01:09.42]Kodoku wo
[01:10.67]Wake au
[01:12.03]Koto ga dekita nara
[01:14.71]Mou ichido
[01:17.22]Chikau yo
[01:18.78] 
[01:22.50]Shikakui BENCH suwari
[01:25.14]Bonyari nagameru sora
[01:27.92]Omoidasunda
[01:30.75]Kinou no you ni
[01:33.29]Sasayaka na egao
[01:35.92]Sasaina iiai mo
[01:38.72]Doredake boku wo
[01:41.35]Tsuyokusaseta darou
[01:44.16]Are kara
[01:45.53]Are kara
[01:46.84]Ano kaketa tsuki no
[01:49.47]Hanbun wo sagashite
[01:54.96]Itsuka wa
[01:56.19]Itsuka wa
[01:57.50]Sakura no hanasaku
[02:00.26]Mangetsu no moto e to
[02:03.99]Utsuri kawaru machinami bokura
[02:07.62]Sekasu you
[02:09.36]Kimi wa ima doko de nani wo shiteru no
[02:14.55]Sorenari no kurashi sorenari no shiawase
[02:19.42]Soredemo
[02:22.09]Mada oikaketeru
[02:24.84] 
[02:43.03]Bokura wa
[02:44.62]Bokura wa
[02:45.92]Ano kaketa tsuki no
[02:48.62]Hanbun wo sagashite
[02:54.04]Kodoku wo
[02:55.29]Wake au
[02:56.66]Koto ga dekita nara
[02:59.29]Mou ichido
[03:02.09]Are kara
[03:03.41]Are kara
[03:04.78]Ano kaketa tsuki no
[03:07.32]Hanbun wo sagashite
[03:12.81]Itsuka wa
[03:14.00]Itsuka wa
[03:15.45]Sakura no hanasaku
[03:18.06]Mangetsu no moto e to
[03:22.25]`
  };

  // Fungsi untuk memparse file LRC
  function parseLRC(lrcText) {
    const lines = lrcText.split('\n');
    const lyrics = [];
    
    // Regex untuk mengekstrak waktu dan teks lirik
    const timeRegex = /\[(\d+):(\d+)(?:\.(\d+))?\](.*)/;
    
    lines.forEach(line => {
      const match = line.match(timeRegex);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const milliseconds = match[3] ? parseInt(match[3]) : 0;
        
        // Konversi waktu ke detik
        const time = minutes * 60 + seconds + milliseconds / 100;
        const text = match[4].trim();
        
        if (text) {
          lyrics.push({ time, text });
        }
      }
    });
    
    // Urutkan lirik berdasarkan waktu
    lyrics.sort((a, b) => a.time - b.time);
    
    return lyrics;
  }

  function render(){
    chairs.forEach((wrap, i) => {
      const angle = (step * i - rot + 90);
      wrap.style.setProperty('--angle', angle + 'deg');

      const norm = ((angle % 360) + 360) % 360;
      const visible = norm > 80 && norm < 100;
      wrap.classList.toggle('is-active', visible);
    });

    const rawIndex = rot / step;
    const mod = ((Math.round(rawIndex) % chairs.length) + chairs.length) % chairs.length;
    const active = chairs[mod];
    currentTrackIndex = mod;

    const prevIndex = (mod - 1 + chairs.length) % chairs.length;
    const nextIndex = (mod + 1) % chairs.length;

    chairs.forEach(chair => {
      chair.classList.remove('is-adjacent', 'is-prev', 'is-next');
    });

    chairs[prevIndex].classList.add('is-adjacent', 'is-prev');
    chairs[nextIndex].classList.add('is-adjacent', 'is-next');

    counter.textContent = `Slide ${mod + 1} / ${chairs.length}`;
    titleEl.textContent = active.dataset.title || `Participant ${mod + 1}`;
    
    // Tampilkan deskripsi karakter
    characterDescriptionEl.textContent = active.dataset.desc || "Deskripsi karakter tidak tersedia.";
    
    // Tampilkan lirik
    const trackTitle = active.dataset.track;
    if (trackTitle && lrcData[trackTitle]) {
      lyricsContainer.style.display = 'block';
      displayLyrics(trackTitle);
    } else {
      lyricsContainer.style.display = 'none';
    }

    // Update logo with animation
    logoEl.classList.add('logo-updating');
    
    setTimeout(() => {
      logoEl.src = active.dataset.logo || '/g/luluco.png';
      logoEl.alt = `${active.dataset.title} logo`;
      logoEl.classList.remove('logo-updating');
    }, 400);
    
    // Update music player
    updateMusicPlayer(active);
  }

  function displayLyrics(trackTitle) {
    const lrcText = lrcData[trackTitle];
    currentLyrics = parseLRC(lrcText);
    currentLyricIndex = -1;
    
    // Kosongkan kontainer lirik
    lyricsContainer.innerHTML = '';
    
    // Tambahkan setiap baris lirik
    currentLyrics.forEach((lyric, index) => {
      const lyricElement = document.createElement('div');
      lyricElement.className = 'lyrics-line';
      lyricElement.textContent = lyric.text;
      lyricElement.dataset.index = index;
      lyricsContainer.appendChild(lyricElement);
    });
  }

  function updateLyrics(currentTime) {
    // Cari baris lirik yang sesuai dengan waktu saat ini
    let newLyricIndex = -1;
    
    for (let i = currentLyrics.length - 1; i >= 0; i--) {
      if (currentTime >= currentLyrics[i].time) {
        newLyricIndex = i;
        break;
      }
    }
    
    // Jika baris lirik berubah, update tampilan
    if (newLyricIndex !== currentLyricIndex) {
      // Hapus kelas active dari semua baris
      const allLyricLines = document.querySelectorAll('.lyrics-line');
      allLyricLines.forEach(line => {
        line.classList.remove('active');
      });
      
      // Tambahkan kelas active ke baris yang sesuai
      if (newLyricIndex >= 0) {
        const activeLyricLine = document.querySelector(`.lyrics-line[data-index="${newLyricIndex}"]`);
        if (activeLyricLine) {
          activeLyricLine.classList.add('active');
          
          // Scroll ke baris yang aktif
          activeLyricLine.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
      
      currentLyricIndex = newLyricIndex;
    }
  }

  function updateMusicPlayer(chair) {
    playerTrackTitle.textContent = chair.dataset.track || "Unknown Track";
    playerTrackArtist.textContent = chair.dataset.artist || "Unknown Artist";
    playerAlbumImg.src = chair.dataset.logo || '/g/luluco.png';
    
    audioPlayer.src = chair.dataset.audio || '';
    
    if (isPlaying) {
      audioPlayer.play().catch(e => console.error("Error playing audio:", e));
    }
    
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    totalTimeEl.textContent = '0:00';
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  // Event listeners untuk pemutar musik
  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioPlayer.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    } else {
      audioPlayer.play().catch(e => console.error("Error playing audio:", e));
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    }
    isPlaying = !isPlaying;
  });

  prevTrackBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + chairs.length) % chairs.length;
    rot -= step;
    render();
  });

  nextTrackBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % chairs.length;
    rot += step;
    render();
  });

  // Update progress bar dan lirik
  audioPlayer.addEventListener('timeupdate', () => {
    if (audioPlayer.duration) {
      const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progress.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
      totalTimeEl.textContent = formatTime(audioPlayer.duration);
      
      // Update lirik berdasarkan waktu
      updateLyrics(audioPlayer.currentTime);
    }
  });

  // Allow seeking
  progressBar.addEventListener('click', (e) => {
    if (audioPlayer.duration) {
      const clickX = e.offsetX;
      const width = progressBar.offsetWidth;
      const clickPercent = clickX / width;
      audioPlayer.currentTime = clickPercent * audioPlayer.duration;
    }
  });

  // Volume control
  volumeSlider.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const width = volumeSlider.offsetWidth;
    const clickPercent = clickX / width;
    audioPlayer.volume = clickPercent;
    volumeLevel.style.width = `${clickPercent * 100}%`;
  });

  // When audio ends, play next track
  audioPlayer.addEventListener('ended', () => {
    nextTrackBtn.click();
  });

  document.getElementById('next').addEventListener('click', () => {
    rot += step;
    render();
  });

  document.getElementById('prev').addEventListener('click', () => {
    rot -= step;
    render();
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    // Adjust layout if needed
  });

  render();