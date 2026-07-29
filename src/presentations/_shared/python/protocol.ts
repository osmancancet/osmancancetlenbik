/**
 * Ana iş parçacığı <-> Pyodide worker mesaj protokolü.
 *
 * Bu dosya HEM worker HEM de runtime tarafından import edilir; tek doğruluk
 * kaynağı burasıdır. Worker `public/` altına düz JS olarak taşınmak zorunda
 * kalırsa bu tipler elle senkron tutulmalıdır.
 */

export type ToWorker =
  /** Worker doğduktan sonra ilk mesaj; Pyodide'ı CDN'den yükletir. */
  | { t: "init"; indexURL: string }
  /**
   * Tek bir çalıştırma isteği.
   * `stdin` satırları input() tarafından sırayla tüketilir.
   * `setup` öğrenciye GÖSTERİLMEYEN hazırlık kodudur: dosya G/Ç slaytlarında
   * sanal dosyayı oluşturur, parça-kod slaytlarında önceki slayttan gelen
   * değişkenleri tanımlar. Traceback'ten filtrelenir.
   */
  | { t: "run"; id: string; code: string; setup: string; stdin: string[] };

export type FromWorker =
  /** Pyodide yüklendi ve çalıştırmaya hazır. */
  | { t: "ready" }
  /** Pyodide yüklenemedi (ağ engeli, CDN erişilemez vb.) — kalıcı hata. */
  | { t: "loadError"; message: string }
  /** Akan çıktı parçası. `seq` sıralamayı garanti eder. */
  | { t: "out"; id: string; seq: number; stream: "stdout" | "stderr"; text: string }
  /** Çıktı üst sınırı aşıldı, çalıştırma kesildi. */
  | { t: "truncated"; id: string }
  /** Başarılı bitiş. */
  | { t: "done"; id: string; ok: true; ms: number }
  /** Hatayla bitiş. `kind` hata mesajını Türkçeleştirirken kullanılır. */
  | {
      t: "done";
      id: string;
      ok: false;
      kind: "python" | "eof" | "internal";
      etype: string;
      message: string;
      traceback: string;
    };

/** Watchdog zaman aşımı ve "Durdur" worker'a mesajla değil terminate() ile uygulanır. */
export type RunOutcome =
  | { status: "ok"; ms: number }
  | { status: "error"; kind: "python" | "eof" | "internal"; etype: string; message: string; traceback: string }
  | { status: "timeout" }
  | { status: "stopped" }
  | { status: "loadError"; message: string };
