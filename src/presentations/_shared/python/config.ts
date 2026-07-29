/**
 * Pyodide çalışma zamanı ayarları.
 *
 * Sürüm KESİN olarak sabitlenir — asla "latest" gibi kayan bir etiket kullanma.
 * jsDelivr sürümlü yollara `Cache-Control: immutable` verir; sabit sürüm sayesinde
 * ikinci ve sonraki yüklemeler HTTP önbelleğinden gelir (derste anında açılır).
 *
 * Neden 0.29.4 (Python 3.13.2) ve 314.x değil:
 * 314.0.3 çok yeni ve yeni bir Emscripten platformu (5_0_3) getiriyor. Bu araç
 * amfide, tek denemede çalışması gereken bir ders aracı — saha süresi olgunluğu
 * yeni Python sürümünden değerli. Yükseltmek istendiğinde tek yapılacak bu iki
 * satırı değiştirmek; API (setStdout({write}), setStdin, runPythonAsync) aynı.
 */
export const PYODIDE_VERSION = "0.29.4";
export const PYODIDE_CDN_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

/** Öğrenci kodunun çalışabileceği azami süre. Aşılırsa worker terminate edilir. */
export const DEFAULT_TIMEOUT_MS = 10_000;

/** Pyodide indirilemezse (kampüs güvenlik duvarı vb.) bu süre sonunda pes edilir. */
export const BOOT_TIMEOUT_MS = 25_000;

/** Çıktı seli koruması: `for i in range(100000): print(i)` sekmeyi boğmasın. */
export const MAX_OUTPUT_BYTES = 200_000;
export const MAX_OUTPUT_LINES = 5_000;

/** Worker'da çıktı tamponlama — her print için postMessage atmayalım. */
export const OUTPUT_FLUSH_MS = 50;
export const OUTPUT_FLUSH_BYTES = 8_192;

/** Terminal DOM'unda tutulan azami satır (üstündekiler kırpılır). */
export const TERMINAL_MAX_RENDER_LINES = 1_000;

/**
 * Öğrenci koduna verilen dosya adı. `<` `>` ile sarılı OLMAMALI — Pyodide
 * açısal parantezli dosya adlarında traceback'e kaynak satırlarını basmaz.
 * Düz bir ad verince öğrenci hatanın hangi satırda olduğunu kod satırıyla
 * birlikte görür; bu dersin öğretim amacına doğrudan hizmet ediyor.
 */
export const PROGRAM_FILENAME = "program.py";
