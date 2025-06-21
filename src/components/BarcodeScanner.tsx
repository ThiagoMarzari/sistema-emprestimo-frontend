"use client";
import { useEffect, useRef } from "react";
import Quagga, { type QuaggaResult } from 'quagga';

type Props = {
  onDetected: (code: string) => void;
};

export function BarcodeScanner({ onDetected }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: ref.current!,
          constraints: { facingMode: "environment" },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader"],
        },
      },
      (err: Error | null) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result: QuaggaResult) => {
      const code = result.codeResult.code;
      onDetected(code);
      Quagga.stop(); // Parar após leitura
    });

    return () => {
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div>
      <div ref={ref} className="w-full overflow-hidden flex justify-center h-[300px] border-2" />
    </div>
  );
}
