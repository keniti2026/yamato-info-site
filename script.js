// =========================================================
// 宇宙戦艦ヤマト 総合情報サイト — script.js
// ナビゲーションのアクティブ表示・モバイルメニュー・タブ切替
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
  setActiveNav();
  setupMobileNav();
  setupTabs();
});

// 現在のページに対応するナビゲーションリンクへ active クラスを付与
function setActiveNav() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var links = document.querySelectorAll('.site-nav a[href]');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href || href.startsWith('http')) return;
    var hrefFile = href.split('/').pop();
    if (hrefFile === path || (path === '' && hrefFile === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// モバイル幅でのハンバーガーメニュー開閉
function setupMobileNav() {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  if (!header || !toggle) return;

  toggle.addEventListener('click', function () {
    var isOpen = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // ナビリンクをクリックしたらメニューを閉じる（モバイル）
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ページ内タブ切替（登場人物 / 音楽 / メカニック等の「全て・カテゴリ」タブ）
function setupTabs() {
  var tabGroups = document.querySelectorAll('[data-tab-group]');
  tabGroups.forEach(function (group) {
    var groupName = group.getAttribute('data-tab-group');
    var buttons = group.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('[data-tab-panel="' + groupName + '"]');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab-target');

        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        panels.forEach(function (panel) {
          if (panel.getAttribute('data-tab-value') === target) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  });
}
