"use client";

// Bu sayfa qr-bait slaytındaki QR'ın hedefidir. Sahte "anket" görünür,
// 1.5 sn sonra "VERİLERİNİZ ALINIYOR" tuzak ekranı açılır.
// API'ye session="default" ile hit kaydedilir — qr-bait/qr-reveal sayaçları
// bu hit'leri okur.
export { QrTrapClient as AnketClient } from "../qr-tuzak/QrTrapClient";
