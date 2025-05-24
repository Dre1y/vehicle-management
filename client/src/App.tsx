import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <CardTitle>Gerenciador de Veículos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={() => navigate("/cars")}>
            Acessar Carros
          </Button>
          <Button className="w-full" onClick={() => navigate("/motorcycles")}>
            Acessar Motos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
