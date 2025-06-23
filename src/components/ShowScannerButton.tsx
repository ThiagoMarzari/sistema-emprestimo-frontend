import { Button } from "./ui/button";
import { BarcodeScanner } from "./BarcodeScanner";

interface Props {
  code?: (code: string) => void;
  showScanner?: boolean;
  onClick?: () => void;
}

export function ShowScannerButton({ code, showScanner, onClick }: Props) {
  return (
    <div>
      <Button
        type="button"
        onClick={onClick}
        className="w-full hidden"
      >
        {showScanner ? "Fechar Scanner" : "Abrir Scanner"}
      </Button>

      {showScanner && (
        <BarcodeScanner onDetected={(detectedCode) => {
          if (code) {
            code(detectedCode);
          }
        }} />
      )}
    </div>
  );
}