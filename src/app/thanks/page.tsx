'use client';
import { useEffect, useState } from 'react';

export default function ThanksPage() {
  const [claimId, setClaimId] = useState<string | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => setClaimId(localStorage.getItem('lastClaimId')), []);

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!claimId || !files?.length) return;
    setBusy(true); setMsg(null);
    try {
      const fd = new FormData();
      Array.from(files).forEach(f => fd.append('files', f));
      const res = await fetch(`/api/claims/${claimId}/attachments`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(String(res.status));
      setMsg('✅ Bilagor uppladdade. Vi börjar handlägga ärendet direkt.');
      setFiles(null);
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
    } catch { setMsg('❌ Kunde inte ladda upp. Försök igen.'); }
    finally { setBusy(false); }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto p-6 space-y-4">
        <h1 className="text-3xl font-bold">Tack!</h1>
        <p className="opacity-80">
          Vi har mottagit din förfrågan{claimId ? ` (ID: ${claimId})` : ''}. 
          Ladda upp dina bilagor nu så påskyndar vi handläggningen.
        </p>

        <div className="bg-white/5 rounded p-4 space-y-2">
          <h2 className="font-semibold">Bilagor vi helst vill ha:</h2>
          <ul className="list-disc list-inside opacity-90 text-sm">
            <li>Boardingkort eller e-biljett</li>
            <li>Bokningsbekräftelse</li>
            <li>Kvittounderlag (om utlägg)</li>
          </ul>
        </div>

        {claimId ? (
          <form onSubmit={upload} className="space-y-3">
            <input
              id="fileInput"
              type="file"
              multiple
              className="w-full border rounded bg-white text-gray-900 p-2"
              onChange={(e) => setFiles(e.target.files)}
              accept=".pdf,.jpg,.jpeg,.png,.heic,.heif"
            />
            <button
              type="submit"
              disabled={busy || !files?.length}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 disabled:opacity-60"
            >
              {busy ? 'Laddar upp…' : 'Ladda upp bilagor'}
            </button>
            {msg && <p className="text-sm">{msg}</p>}
          </form>
        ) : (
          <p className="text-sm">Kunde inte hitta ditt ärende-ID. Skicka in formuläret igen.</p>
        )}

        <div className="pt-2 text-sm opacity-80">
          När allt finns på plats skickar vi ärendet vidare till flygbolaget automatiskt.
        </div>

        <div className="mt-4 flex gap-3">
          <a href="/" className="px-4 py-2 rounded bg-white text-black">Till startsidan</a>
          <a href="/admin" className="px-4 py-2 rounded bg-gray-700">Admin</a>
        </div>
      </div>
    </main>
  );
}
