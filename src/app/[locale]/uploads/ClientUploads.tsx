'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ClientUploads() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const claimId = searchParams.get('claimId');

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  if (!claimId) {
    return <p className="p-8 text-white">Missing claim reference.</p>;
  }

  async function handleUpload() {
    if (files.length === 0) {
      router.push(`/iban?claimId=${claimId}`);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));

    await fetch(`/api/claims/${claimId}/attachments`, {
      method: 'POST',
      body: formData,
    });

    router.push(`/iban?claimId=${claimId}`);
  }

  return (
    <div className="mx-auto max-w-xl p-6 text-white">
      <h1 className="text-xl font-semibold mb-4">
        Upload documents
      </h1>

      <p className="text-sm text-white/70 mb-6">
        Upload your boarding pass, ticket or receipts.  
        You can also skip this step and upload later.
      </p>

      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) =>
          setFiles(Array.from(e.target.files || []))
        }
        className="mb-6"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full rounded bg-emerald-500 px-6 py-3 font-semibold text-black disabled:opacity-40"
      >
        {loading ? 'Uploading…' : 'Continue'}
      </button>
    </div>
  );
}
